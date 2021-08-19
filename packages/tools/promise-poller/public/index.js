
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}((function () { 'use strict';

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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

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

    var CANCEL_TOKEN = 'CANCEL_TOKEN';
    var timeout = function (promise, interval) {
        return new Promise(function (resolve, reject) {
            var timeoutId = setTimeout(function () { return reject(new Error('Task timeout')); }, interval);
            promise.then(function (result) {
                clearTimeout(timeoutId);
                resolve(result);
            });
        });
    };
    var delay = function (interval) { return new Promise(function (resolve) {
        setTimeout(resolve, interval);
    }); };

    var strategies = {
        'fixed-interval': {
            defaults: {
                interval: 1000
            },
            getNextInterval: function (count, options) {
                return options.interval;
            }
        },
        'linear-backoff': {
            defaults: {
                start: 1000,
                increment: 1000
            },
            getNextInterval: function (count, options) {
                return options.start + options.increment * count;
            }
        },
        'exponential-backoff': {
            defaults: {
                min: 1000,
                max: 30000
            },
            getNextInterval: function (count, options) {
                return Math.min(options.max, Math.round(Math.random() * (Math.pow(2, count) * 1000 - options.min) + options.min));
            }
        }
    };

    var promisePoller = function (options) {
        var strategy = strategies[options.strategy] || strategies['fixed-interval'];
        var mergedOptions = __assign(__assign({}, strategy.defaults), options);
        var taskFn = mergedOptions.taskFn, masterTimeout = mergedOptions.masterTimeout, taskTimeout = mergedOptions.taskTimeout, progressCallback = mergedOptions.progressCallback, shouldContinue = mergedOptions.shouldContinue, _a = mergedOptions.retries, retries = _a === void 0 ? 5 : _a;
        var polling = true;
        var timeoutId;
        var rejections = [];
        var retriesRemain = retries;
        return new Promise(function (resolve, reject) {
            // 整个轮询过程超时
            if (masterTimeout) {
                timeoutId = window.setTimeout(function () {
                    reject(new Error('Master timeout'));
                    polling = false;
                }, masterTimeout);
            }
            // 轮询函数
            var poll = function () {
                var taskResult = taskFn();
                // 同步结束任务
                if (taskResult === false) {
                    taskResult = Promise.reject(taskResult);
                    reject(rejections);
                    polling = false;
                }
                var taskPromise = Promise.resolve(taskResult);
                if (taskTimeout) {
                    taskPromise = timeout(taskPromise, taskTimeout);
                }
                taskPromise
                    .then(function (result) {
                    if (shouldContinue(null, result)) {
                        var nextInterval = strategy.getNextInterval(retriesRemain, mergedOptions);
                        // 继续轮询
                        delay(nextInterval).then(poll);
                    }
                    else {
                        // 不需要轮询，有 timeoutId 则清除
                        if (timeoutId !== null) {
                            clearTimeout(timeoutId);
                        }
                        // 结束并返回最后一次 taskFn 的结果
                        resolve(result);
                    }
                })
                    .catch(function (error) {
                    // 异步结束任务
                    if (error.message === CANCEL_TOKEN) {
                        reject(rejections);
                        polling = false;
                    }
                    rejections.push(error);
                    // 回调获取 retriesRemain
                    if (progressCallback) {
                        progressCallback(retriesRemain, error);
                    }
                    if (--retriesRemain === 0 || !shouldContinue(error)) {
                        // 不需要轮询
                        reject(rejections);
                    }
                    else if (polling) {
                        var nextInterval = strategy.getNextInterval(retriesRemain, options);
                        // 重试轮询
                        delay(nextInterval).then(poll);
                    }
                });
            };
            // 第一次轮询
            poll();
        });
    };

    var $start = document.querySelector('#start');
    var $asyncStop = document.querySelector('#async-stop');
    var $fixedCounter = document.querySelector('#fixed-counter');
    var $linearCounter = document.querySelector('#linear-counter');
    var $exponentialCounter = document.querySelector('#exponential-counter');
    var fixedCounter = 0;
    var linearCounter = 0;
    var exponentialCounter = 0;
    var stop = false;
    var limit = 99999;
    $start.onclick = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            promisePoller({
                strategy: 'fixed-interval',
                interval: 100,
                taskFn: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (stop) {
                            throw new Error(CANCEL_TOKEN);
                        }
                        fixedCounter += 1;
                        $fixedCounter.innerText = fixedCounter.toString();
                        return [2 /*return*/];
                    });
                }); },
                shouldContinue: function () { return fixedCounter < limit; },
            });
            promisePoller({
                strategy: 'linear-backoff',
                start: 100,
                increment: 100,
                taskFn: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (stop) {
                            throw new Error(CANCEL_TOKEN);
                        }
                        linearCounter += 1;
                        $linearCounter.innerText = linearCounter.toString();
                        return [2 /*return*/];
                    });
                }); },
                shouldContinue: function () { return linearCounter < limit; }
            });
            promisePoller({
                strategy: 'exponential-backoff',
                min: 100,
                max: 3000,
                taskFn: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (stop) {
                            throw new Error(CANCEL_TOKEN);
                        }
                        exponentialCounter += 1;
                        $exponentialCounter.innerText = exponentialCounter.toString();
                        return [2 /*return*/];
                    });
                }); },
                shouldContinue: function () { return linearCounter < limit; }
            });
            return [2 /*return*/];
        });
    }); };
    $asyncStop.onclick = function () { return stop = true; };

})));
//# sourceMappingURL=index.js.map
