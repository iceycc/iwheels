!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).$_jsCookie=t()}(this,(function(){"use strict";
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
    ***************************************************************************** */var e=function(){return(e=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},t=/(%[\dA-F]{2})+/gi;return function t(n,r){function o(t,o,i){if(void 0===i&&(i=r),"undefined"==typeof document)return null;(i=e(e({},r),i)).expires&&"number"==typeof i.expires&&(i.expires=new Date(Date.now()+864e5*i.expires),i.expires=i.expires.toUTCString()),o=n.encode(o);var u=Object.entries(i).reduce((function(e,t){var n=t[0],r=t[1];return r?(e+="; "+n,!0===r?e:e+="="+r.split("; ")[0]):e}),"");return document.cookie=t+"="+o+u}return Object.create({get:function(e){if("undefined"==typeof document)return null;var t=document.cookie?document.cookie.split("; "):[],r={};return t.some((function(t){var o=t.split("="),i=o[0],u=o.slice(1);try{r[i]=n.decode(u.join("="))}catch(e){}return i===e})),e?r[e]:null},set:o,del:function(t,n){void 0===n&&(n=r),o(t,"",e(e({},n),{expires:-1}))},withConverter:function(n){return t(e(e({},this.converter),n),this.attributes)},withAttributes:function(n){return t(this.converter,e(e({},this.attributes),n))}},{converter:{value:Object.freeze(n)},attributes:{value:Object.freeze(r)}})}({encode:function(e){return e.replace(t,encodeURIComponent)},decode:function(e){return e.replace(t,decodeURIComponent)}},{path:"/"})}));
//# sourceMappingURL=index.js.map
