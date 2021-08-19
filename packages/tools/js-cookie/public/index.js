
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

    // 1000*60*60*24 or 86400000
    // 详见：https://stackoverflow.com/questions/18359401/javascript-date-gettime-code-snippet-with-mysterious-additional-characters
    var TWENTY_FOUR_HOURS = 864e5;
    var ASCII_HEX_REGEXP = /(%[\dA-F]{2})+/gi;
    // 默认 Cookie 属性
    var defaultAttributes = {
        path: '/'
    };
    // 默认 Cookie 值的转换器
    var defaultConverter = {
        encode: function (text) {
            return text.replace(ASCII_HEX_REGEXP, encodeURIComponent);
        },
        decode: function (text) {
            return text.replace(ASCII_HEX_REGEXP, decodeURIComponent);
        },
    };

    function init(initConverter, initAttributes) {
        function get(key) {
            if (typeof document === 'undefined')
                return null;
            var cookiePairs = document.cookie ? document.cookie.split('; ') : [];
            var cookieStore = {};
            cookiePairs.some(function (pair) {
                var _a = pair.split('='), curtKey = _a[0], curtValue = _a.slice(1);
                try {
                    // 有可能 value 存在 '='
                    cookieStore[curtKey] = initConverter.decode(curtValue.join('='));
                }
                catch (e) { }
                return curtKey === key; // 如果相等时，就会 break
            });
            return key ? cookieStore[key] : null;
        }
        /**
         * 设置 Cookie key-val 对
         */
        function set(key, value, attributes) {
            if (attributes === void 0) { attributes = initAttributes; }
            if (typeof document === 'undefined')
                return null;
            attributes = __assign(__assign({}, initAttributes), attributes);
            if (attributes.expires) {
                // 将过期天数转为 UTC string
                if (typeof attributes.expires === 'number') {
                    attributes.expires = new Date(Date.now() + attributes.expires * TWENTY_FOUR_HOURS);
                    attributes.expires = attributes.expires.toUTCString();
                }
            }
            value = initConverter.encode(value);
            // 获取 Cookie 其它属性的字符串形式
            var attrStr = Object.entries(attributes).reduce(function (prevStr, attrPair) {
                var attrKey = attrPair[0], attrValue = attrPair[1];
                if (!attrValue)
                    return prevStr;
                prevStr += "; " + attrKey;
                // attrValue 有可能为 truthy，所以要排除 true 值的情况
                if (attrValue === true)
                    return prevStr;
                // 排除 attrValue 存在 ";" 号的情况
                prevStr += "=" + attrValue.split('; ')[0];
                return prevStr;
            }, '');
            return document.cookie = key + "=" + value + attrStr;
        }
        /**
         * 删除某个 Cookie
         */
        function del(key, attributes) {
            if (attributes === void 0) { attributes = initAttributes; }
            // 将 expires 减 1 天，Cookie 自动失败
            set(key, '', __assign(__assign({}, attributes), { expires: -1 }));
        }
        /**
         * 添加自定义 converter
         */
        function withConverter(customConverter) {
            return init(__assign(__assign({}, this.converter), customConverter), this.attributes);
        }
        /**
         * 添加自定义 attributes
         */
        function withAttributes(customAttributes) {
            return init(this.converter, __assign(__assign({}, this.attributes), customAttributes));
        }
        return Object.create({ get: get, set: set, del: del, withConverter: withConverter, withAttributes: withAttributes }, {
            converter: { value: Object.freeze(initConverter) },
            attributes: { value: Object.freeze(initAttributes) },
        });
    }
    var Cookies = init(defaultConverter, defaultAttributes);

    var myCookies = Cookies;
    var $getForm = document.querySelector('#getForm');
    var $setForm = document.querySelector('#setForm');
    var $delForm = document.querySelector('#delForm');
    var $setKey = document.querySelector('#setKey');
    var $setValue = document.querySelector('#setValue');
    var $getKey = document.querySelector('#getKey');
    var $getValue = document.querySelector('#getValue');
    var $delKey = document.querySelector('#delKey');
    var $withConverter = document.querySelector('#withConverter');
    var $withAttributes = document.querySelector('#withAttributes');
    var $cookie = document.querySelector('#cookie');
    $setForm.onsubmit = function (e) {
        e.preventDefault();
        var key = $setKey.value;
        var value = $setValue.value;
        myCookies.set(key, value);
        $cookie.textContent = document.cookie;
    };
    $getForm.onsubmit = function (e) {
        e.preventDefault();
        var key = $getKey.value;
        var value = myCookies.get(key);
        $getValue.textContent = value;
    };
    $delForm.onsubmit = function (e) {
        e.preventDefault();
        var key = $delKey.value;
        myCookies.del(key);
        $cookie.textContent = document.cookie;
    };
    $withConverter.onclick = function () {
        myCookies = Cookies.withConverter({
            encode: function () { return 'World'; },
            decode: function () { return 'Hello'; },
        });
    };
    $withAttributes.onclick = function () {
        myCookies = Cookies.withAttributes({ expires: 3 });
    };
    $cookie.textContent = document.cookie;

})));
//# sourceMappingURL=index.js.map
