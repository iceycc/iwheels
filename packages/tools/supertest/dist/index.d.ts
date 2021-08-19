import methods from 'methods';
import http from 'http';
import { Request, agent } from 'superagent';
import https from 'https';
import assert from 'assert';
import util from 'util';

// 包裹原函数，提供更优雅的报错堆栈
function wrapAssertFn(assertFn) {
    // 保留最后 3 行
    const savedStack = new Error().stack.split('\n').slice(3);

    return function (res) {
        const err = assertFn(res);
        if (err instanceof Error && err.stack) {
            // 去掉第 1 行
            const badStack = err.stack.replace(err.message, '').split('\n').slice(1);
            err.stack = [err.toString()]
                .concat(savedStack)
                .concat('--------')
                .concat(badStack)
                .join('\n');
        }

        return err
    }
}

// 优化错误展示内容
function error(msg, expected, actual) {
    const err = new Error(msg);
    err.expected = expected;
    err.actual = actual;
    err.showDiff = true;
    return err
}

class Test extends Request {
    // 初始化
    constructor(app, method, path) {
        super(method.toUpperCase(), path);

        this.redirects(0); // 禁止重定向
        this.app = app; // app/string
        this.url = typeof app === 'string' ? app + path : this.serverAddress(app, path); // 请求路径
        this._asserts = []; // Assertion 队列
    }

    // 通过 app 获取请求路径
    serverAddress(app, path) {
        if (!app.address()) {
            this._server = app.listen(0); // 内部 server
        }

        const port = app.address().port;
        const protocol = app instanceof https.Server ? 'https' : 'http';
        return `${protocol}://127.0.0.1:${port}${path}`
    }

    /**
     *   .expect(200)
     *   .expect(200, fn)
     *   .expect(200, body)
     *   .expect('Some body')
     *   .expect('Some body', fn)
     *   .expect('Content-Type', 'application/json')
     *   .expect('Content-Type', 'application/json', fn)
     *   .expect(fn)
     */
    expect(a, b, c) {
        // 回调
        if (typeof a === 'function') {
            this._asserts.push(wrapAssertFn(a));
            return this
        }
        if (typeof b === 'function') this.end(b);
        if (typeof c === 'function') this.end(c);

        // 状态码
        if (typeof a === 'number') {
            this._asserts.push(wrapAssertFn(this._assertStatus.bind(this, a)));
            // body
            if (typeof b !== 'function' && arguments.length > 1) {
                this._asserts.push(wrapAssertFn(this._assertBody.bind(this, b)));
            }
            return this
        }

        // header
        if (typeof b === 'string' || typeof b === 'number' || b instanceof RegExp) {
            this._asserts.push(wrapAssertFn(this._assertHeader.bind(this, {name: '' + a, value: b})));
            return this
        }

        // body
        this._asserts.push(wrapAssertFn(this._assertBody.bind(this, a)));

        return this
    }

    // 汇总所有 Assertion 结果
    end(fn) {
        const self = this;
        const server = this._server;
        const end = Request.prototype.end;

        end.call(this, function (err, res) {
            if (server && server._handle) return server.close(localAssert)

            localAssert();

            function localAssert() {
                self.assert(err, res, fn);
            }
        });

        return this
    }

    // 执行所有 Assertion
    assert(resError, res, fn) {
        // 通用网络错误
        const sysErrors = {
            ECONNREFUSED: 'Connection refused',
            ECONNRESET: 'Connection reset by peer',
            EPIPE: 'Broken pipe',
            ETIMEDOUT: 'Operation timed out'
        };

        let errorObj = null;

        // 处理返回的错误
        if (!res && resError) {
            if (resError instanceof Error && resError.syscall === 'connect' && sysErrors[resError.code]) {
                errorObj = new Error(resError.code + ': ' + sysErrors[resError.code]);
            } else {
                errorObj = resError;
            }
        }

        // 执行所有 Assertion
        for (let i = 0; i < this._asserts.length && !errorObj; i++) {
            errorObj = this._assertFunction(this._asserts[i], res);
        }

        // 处理 superagent 的错误
        if (!errorObj && resError instanceof Error && (!res || resError.status !== res.status)) {
            errorObj = resError;
        }

        fn.call(this, errorObj || null, res);
    }

    // 判断当前状态码是否相等
    _assertStatus(status, res) {
        if (status !== res.status) {
            const expectStatusContent = http.STATUS_CODES[status];
            const actualStatusContent = http.STATUS_CODES[res.status];
            return new Error('expected ' + status + ' "' + expectStatusContent + '", got ' + res.status + ' "' + actualStatusContent + '"')
        }
    }

    // 判断当前 body 是否相等
    _assertBody(body, res) {
        const isRegExp = body instanceof RegExp;

        if (typeof body === 'object' && !isRegExp) { // 普通 body 的对比
            try {
                assert.deepStrictEqual(body, res.body);
            } catch (err) {
                const expectBody = util.inspect(body);
                const actualBody = util.inspect(res.body);
                return error('expected ' + expectBody + ' response body, got ' + actualBody, body, res.body)
            }
        } else if (body !== res.text) { // 普通文本内容的对比
            const expectBody = util.inspect(body);
            const actualBody = util.inspect(res.text);

            if (isRegExp) {
                if (!body.test(res.text)) { // body 是正则表达式的情况
                    return error('expected body ' + actualBody + ' to match ' + body, body, res.body)
                }
            } else {
                return error(`expected ${expectBody} response body, got ${actualBody}`, body, res.body)
            }
        }
    }

    // 判断当前 header 是否相等
    _assertHeader(header, res) {
        const field = header.name;
        const actualValue = res.header[field.toLowerCase()];
        const expectValue = header.value;

        // field 不存在
        if (typeof actualValue === 'undefined') {
            return new Error('expected "' + field + '" header field')
        }
        // 相等的情况
        if ((Array.isArray(actualValue) && actualValue.toString() === expectValue) || actualValue === expectValue) {
            return
        }
        // 检查正则的情况
        if (expectValue instanceof RegExp) {
            if (!expectValue.test(actualValue)) {
                return new Error('expected "' + field + '" matching ' + expectValue + ', got "' + actualValue + '"')
            }
        } else {
            return new Error('expected "' + field + '" of "' + expectValue + '", got "' + actualValue + '"')
        }
    }

    // 执行单个 Assertion
    _assertFunction(fn, res) {
        let err;
        try {
            err = fn(res);
        } catch (e) {
            err = e;
        }
        if (err instanceof Error) return err
    }
}

class TestAgent extends agent {
    // 初始化
    constructor(app, options) {
        super();

        // 创建服务器
        if (typeof app === 'function') {
            app = http.createServer(app);
        }

        // https
        if (options) {
            this._ca = options.ca;
            this._key = options.key;
            this._cert = options.cert;
        }

        // 使用 superagent 的代理
        agent.call(this);
        this.app = app;
    }

    // host 函数
    host(host) {
        this._host = host;
        return this
    }

    // 重用 delete
    del(...args) {
        this.delete(args);
    }
}

// 重写 http 的 restful method
methods.forEach(function (method) {
    TestAgent.prototype[method] = function (url, fn) {
        // 初始化请求
        const req = new Test(this.app, method.toLowerCase(), url);

        // https
        req.ca(this._ca);
        req.key(this._key);
        req.cert(this._cert);

        // host
        if (this._host) {
            req.set('host', this._host);
        }

        // http 返回时保存 Cookie
        req.on('response', this._saveCookies.bind(this));
        // 重定向除了保存 Cookie，同时附带上 Cookie
        req.on('redirect', this._saveCookies.bind(this));
        req.on('redirect', this._attachCookies.bind(this));

        // 本次请求就带上 Cookie
        this._attachCookies(req);
        this._setDefaults(req);

        return req
    };
});

function request(app) {
    const obj = {};

    if (typeof app === 'function') {
        app = http.createServer(app);
    }

    methods.forEach(function(method) {
        obj[method] = function(url) {
            return new Test(app, method, url)
        };
    });

    obj.del = obj.delete;

    return obj
}

request.agent = TestAgent;

export { request as default };
//# sourceMappingURL=index.d.ts.map
