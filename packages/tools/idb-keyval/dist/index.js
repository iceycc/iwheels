!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).$_idbKeyval={})}(this,(function(n){"use strict";
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
    ***************************************************************************** */function t(n,t,e,r){return new(e||(e=Promise))((function(i,u){function o(n){try{s(r.next(n))}catch(n){u(n)}}function c(n){try{s(r.throw(n))}catch(n){u(n)}}function s(n){var t;n.done?i(n.value):(t=n.value,t instanceof e?t:new e((function(n){n(t)}))).then(o,c)}s((r=r.apply(n,t||[])).next())}))}function e(n,t){var e,r,i,u,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return u={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function c(u){return function(c){return function(u){if(e)throw new TypeError("Generator is already executing.");for(;o;)try{if(e=1,r&&(i=2&u[0]?r.return:u[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,u[1])).done)return i;switch(r=0,i&&(u=[2&u[0],i.value]),u[0]){case 0:case 1:i=u;break;case 4:return o.label++,{value:u[1],done:!1};case 5:o.label++,r=u[1],u=[0];continue;case 7:u=o.ops.pop(),o.trys.pop();continue;default:if(!(i=o.trys,(i=i.length>0&&i[i.length-1])||6!==u[0]&&2!==u[0])){o=0;continue}if(3===u[0]&&(!i||u[1]>i[0]&&u[1]<i[3])){o.label=u[1];break}if(6===u[0]&&o.label<i[1]){o.label=i[1],i=u;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(u);break}i[2]&&o.ops.pop(),o.trys.pop();continue}u=t.call(n,o)}catch(n){u=[6,n],r=0}finally{e=i=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,c])}}}var r=null;function i(n){return new Promise((function(t,e){n.oncomplete=n.onsuccess=function(){return t(n.result)},n.onabort=n.onerror=function(){return e(n.error)}}))}function u(n,r){return t(this,void 0,void 0,(function(){var u,o,c=this;return e(this,(function(s){switch(s.label){case 0:return(u=indexedDB.open(n)).onupgradeneeded=function(){return u.result.createObjectStore(r)},[4,i(u)];case 1:return o=s.sent(),[2,function(n,i){return t(c,void 0,void 0,(function(){return e(this,(function(t){return[2,i(o.transaction(r,n).objectStore(r))]}))}))}]}}))}))}function o(){return t(this,void 0,void 0,(function(){return e(this,(function(n){switch(n.label){case 0:return r?[3,2]:[4,u("key-val","keyval")];case 1:r=n.sent(),n.label=2;case 2:return[2,r]}}))}))}function c(n,t){return n("readonly",(function(n){return n.openCursor().onsuccess=function(){this.result&&(t(this.result),this.result.continue())},i(n.transaction)}))}n.clear=function(n){return void 0===n&&(n=o()),t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,n];case 1:return[2,t.sent()("readwrite",(function(n){return i(n.clear())}))]}}))}))},n.createStore=u,n.del=function(n,r){return void 0===r&&(r=o()),t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,r];case 1:return[2,t.sent()("readwrite",(function(t){return i(t.delete(n))}))]}}))}))},n.entries=function(n){return void 0===n&&(n=o()),t(this,void 0,void 0,(function(){var t,r;return e(this,(function(e){switch(e.label){case 0:return t=[],r=c,[4,n];case 1:return[2,r.apply(void 0,[e.sent(),function(n){return t.push([n.key,n.value])}]).then((function(){return t}))]}}))}))},n.get=function(n,r){return void 0===r&&(r=o()),t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,r];case 1:return[2,t.sent()("readonly",(function(t){return i(t.get(n))}))]}}))}))},n.getDefaultStore=o,n.getMany=function(n,r){return void 0===r&&(r=o()),t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,r];case 1:return[2,t.sent()("readonly",(function(t){return Promise.all(n.map((function(n){return i(t.get(n))})))}))]}}))}))},n.keys=function(n){return void 0===n&&(n=o()),t(this,void 0,void 0,(function(){var t,r;return e(this,(function(e){switch(e.label){case 0:return t=[],r=c,[4,n];case 1:return[2,r.apply(void 0,[e.sent(),function(n){return t.push(n.key)}]).then((function(){return t}))]}}))}))},n.promisifyRequest=i,n.set=function(n,r,u){return void 0===u&&(u=o()),t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,u];case 1:return[2,t.sent()("readwrite",(function(t){return i(t.put(r,n))}))]}}))}))},n.setMany=function(n,r){return void 0===r&&(r=o()),t(this,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,r];case 1:return[2,t.sent()("readwrite",(function(t){return n.forEach((function(n){var e=n[0],r=n[1];return t.put(r,e)})),i(t.transaction)}))]}}))}))},n.values=function(n){return void 0===n&&(n=o()),t(this,void 0,void 0,(function(){var t,r;return e(this,(function(e){switch(e.label){case 0:return t=[],r=c,[4,n];case 1:return[2,r.apply(void 0,[e.sent(),function(n){return t.push(n.value)}]).then((function(){return t}))]}}))}))},Object.defineProperty(n,"__esModule",{value:!0})}));
//# sourceMappingURL=index.js.map