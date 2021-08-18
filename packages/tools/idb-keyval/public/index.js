
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.$_idbKeyval = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var defaultStore = null;
    /**
     * 将 request 变为 Promise 对象
     * indexeddb 操作成功后会调用 onsuccess，因此绑定到 resolve
     * indexeddb 操作失败后会调用 onerror，因此绑定到 reject
     * @param request
     */
    function promisifyRequest(request) {
        return new Promise(function (resolve, reject) {
            // @ts-ignore
            request.oncomplete = request.onsuccess = function () { return resolve(request.result); };
            // @ts-ignore
            request.onabort = request.onerror = function () { return reject(request.error); };
        });
    }
    /**
     * 创建数据库，并提供操作入口
     * @param dbName
     * @param storeName
     */
    function createStore(dbName, storeName) {
        return __awaiter(this, void 0, void 0, function () {
            var request, db;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = indexedDB.open(dbName);
                        // 新建数据库与打开数据库是同一个操作。如果指定的数据库不存在，就会新建。
                        request.onupgradeneeded = function () { return request.result.createObjectStore(storeName); };
                        return [4 /*yield*/, promisifyRequest(request)];
                    case 1:
                        db = _a.sent();
                        // 第一个参数为事务的模式，第二个参数为开发者的回调
                        return [2 /*return*/, function (txMode, callback) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    // 增、删、改、查都用事务处理，需要的入参有：
                                    // storeName：操作对象，txMode：事务模式
                                    return [2 /*return*/, callback(db.transaction(storeName, txMode).objectStore(storeName))];
                                });
                            }); }];
                }
            });
        });
    }
    /**
     * 获取单例 default store
     */
    function getDefaultStore() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!defaultStore) return [3 /*break*/, 2];
                        return [4 /*yield*/, createStore('key-val', 'keyval')];
                    case 1:
                        defaultStore = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, defaultStore];
                }
            });
        });
    }
    /**
     * 根据 key 获取对应 value
     * @param key 传入的 key
     * @param customStore 自定义 store 获取 defaultStore
     */
    function get(key, customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, (_a.sent())('readonly', function (store) { return promisifyRequest(store.get(key)); })];
                }
            });
        });
    }
    /**
     * 批量获取 values
     * @param keys 传入的 keys
     * @param customStore 自定义 store 获取 defaultStore
     */
    function getMany(keys, customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, (_a.sent())('readonly', function (store) {
                            return Promise.all(keys.map(function (k) { return promisifyRequest(store.get(k)); }));
                        })];
                }
            });
        });
    }
    /**
     * 设置 key-value 对，key 不存在则创建，key 存在则覆盖
     * @param key 传入的 key
     * @param value 传入的 value
     * @param customStore 自定义 store 获取 defaultStore
     */
    function set(key, value, customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customStore];
                    case 1: 
                    // 注意：这里参数的顺序：第一个是 value，第二个才是 key
                    return [2 /*return*/, (_a.sent())('readwrite', function (store) { return promisifyRequest(store.put(value, key)); })];
                }
            });
        });
    }
    /**
     * 批量设置 key-value 对
     * @param entries 传入的键值对
     * @param customStore 自定义 store 获取 defaultStore
     */
    function setMany(entries, customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, (_a.sent())('readwrite', function (store) {
                            entries.forEach(function (_a) {
                                var k = _a[0], v = _a[1];
                                return store.put(v, k);
                            });
                            return promisifyRequest(store.transaction);
                        })];
                }
            });
        });
    }
    /**
     * 根据 key 删除对应的 key-value 对
     * @param key 传入的 key
     * @param customStore 自定义 store 获取 defaultStore
     */
    function del(key, customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, (_a.sent())('readwrite', function (store) { return promisifyRequest(store.delete(key)); })];
                }
            });
        });
    }
    /**
     * 清除数据库内容
     * @param customStore 自定义 store 获取 defaultStore
     */
    function clear(customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, (_a.sent())('readwrite', function (store) { return promisifyRequest(store.clear()); })];
                }
            });
        });
    }
    /**
     * 通过 cursor 获取 storeObject 里的所有 key-value
     * @param customStore
     * @param callback
     */
    function eachCursor(customStore, callback) {
        return customStore('readonly', function (store) {
            store.openCursor().onsuccess = function () {
                if (!this.result)
                    return;
                callback(this.result);
                this.result.continue();
            };
            return promisifyRequest(store.transaction);
        });
    }
    /**
     * 获取数据库里所有 keys
     * @param customStore
     */
    function keys(customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            var keys, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keys = [];
                        _a = eachCursor;
                        return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()),
                            function (cursor) { return keys.push(cursor.key); }]).then(function () { return keys; })];
                }
            });
        });
    }
    /**
     * 获取数据库里所有 values
     * @param customStore
     */
    function values(customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            var values, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        values = [];
                        _a = eachCursor;
                        return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()),
                            function (cursor) { return values.push(cursor.value); }]).then(function () { return values; })];
                }
            });
        });
    }
    /**
     * 获取数据库里所有 entries
     * @param customStore
     */
    function entries(customStore) {
        if (customStore === void 0) { customStore = getDefaultStore(); }
        return __awaiter(this, void 0, void 0, function () {
            var entries, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        entries = [];
                        _a = eachCursor;
                        return [4 /*yield*/, customStore];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()),
                            function (cursor) { return entries.push([cursor.key, cursor.value]); }]).then(function () { return entries; })];
                }
            });
        });
    }

    var dbName = 'key-val';
    var storeName = 'keyval';
    function uglyGet(key) {
        // 打开数据库
        var openDBRequest = indexedDB.open(dbName);
        // 创建表
        openDBRequest.onupgradeneeded = function () {
            openDBRequest.result.createObjectStore(storeName);
        };
        // 失败回调
        openDBRequest.onerror = function () { return console.log('出错啦'); };
        // 成功回调
        openDBRequest.onsuccess = function () {
            // 获取数据库
            var db = openDBRequest.result;
            // 获取数据库里的 store
            var store = db.transaction(storeName, 'readonly').objectStore(storeName);
            // 获取值操作
            var getRequest = store.get(key);
            getRequest.onsuccess = function () {
                // 获取到值
                console.log("\u83B7\u53D6 " + key + " \u6210\u529F", this.result);
            };
            getRequest.onerror = function () {
                console.log("\u83B7\u53D6 " + key + " \u5931\u8D25");
            };
        };
    }

    var key = 'name';
    var value = '帅哥';
    var inputKeys = ['age', 'gender'];
    var inputKeyvals = [['age', 11], ['gender', '男人']];
    // 绑定对应 idb-keyval 的方法
    document.querySelector('#set').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, set(key, value)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#get').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get(key)];
                case 1:
                    value = _a.sent();
                    console.log('value: ' + value);
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#del').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, del(key)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#clear').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clear()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#getMany').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMany(inputKeys)];
                case 1:
                    values = _a.sent();
                    console.log('values: ' + values.join(', '));
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#setMany').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, setMany(inputKeyvals)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#keys').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resultKeys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, keys()];
                case 1:
                    resultKeys = _a.sent();
                    console.log('keys: ' + resultKeys.join(', '));
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#values').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resultValues;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, values()];
                case 1:
                    resultValues = _a.sent();
                    console.log('values: ' + resultValues.join(', '));
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#entries').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resultEntries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, entries()];
                case 1:
                    resultEntries = _a.sent();
                    console.log('entries: ' + resultEntries.join(', '));
                    return [2 /*return*/];
            }
        });
    }); });
    document.querySelector('#uglyGet').addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var value;
        return __generator(this, function (_a) {
            value = uglyGet('hello');
            console.log('value: ' + value);
            return [2 /*return*/];
        });
    }); });
    var index = {};

    return index;

})));
//# sourceMappingURL=index.js.map
