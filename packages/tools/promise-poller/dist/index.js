!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).$_promisePoller=t()}(this,(function(){"use strict";
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
    ***************************************************************************** */var e=function(){return(e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},t=function(e){return new Promise((function(t){setTimeout(t,e)}))},n={"fixed-interval":{defaults:{interval:1e3},getNextInterval:function(e,t){return t.interval}},"linear-backoff":{defaults:{start:1e3,increment:1e3},getNextInterval:function(e,t){return t.start+t.increment*e}},"exponential-backoff":{defaults:{min:1e3,max:3e4},getNextInterval:function(e,t){return Math.min(t.max,Math.round(Math.random()*(1e3*Math.pow(2,e)-t.min)+t.min))}}};return function(r){var i,o=n[r.strategy]||n["fixed-interval"],a=e(e({},o.defaults),r),u=a.taskFn,f=a.masterTimeout,s=a.taskTimeout,l=a.progressCallback,c=a.shouldContinue,m=a.retries,d=!0,v=[],h=void 0===m?5:m;return new Promise((function(e,n){f&&(i=window.setTimeout((function(){n(new Error("Master timeout")),d=!1}),f));var m=function(){var f=u();!1===f&&(f=Promise.reject(f),n(v),d=!1);var p,g,x=Promise.resolve(f);s&&(p=x,g=s,x=new Promise((function(e,t){var n=setTimeout((function(){return t(new Error("Task timeout"))}),g);p.then((function(t){clearTimeout(n),e(t)}))}))),x.then((function(n){if(c(null,n)){var r=o.getNextInterval(h,a);t(r).then(m)}else null!==i&&clearTimeout(i),e(n)})).catch((function(e){if("CANCEL_TOKEN"===e.message&&(n(v),d=!1),v.push(e),l&&l(h,e),0!=--h&&c(e)){if(d){var i=o.getNextInterval(h,r);t(i).then(m)}}else n(v)}))};m()}))}}));
//# sourceMappingURL=index.js.map
