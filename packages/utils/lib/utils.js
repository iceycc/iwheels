'use strict';
const utils = {
    /**
     * 字符串转驼峰
     * @param str 需要转的字符串
     * @param sep 分割符，默认 '-'
     * @returns {*}
     */
    doCamel(str, sep = '-') {
        let reg = `([^${sep}])(?:${sep}+([^${sep}]))`
        return str.replace(new RegExp(reg, 'g'), function ($0, $1, $2) {
            return $1 + $2.toUpperCase();
        });
    }
}
module.exports = utils;
let a = 'name_age_yang'
console.log(utils.doCamel(a, '_'))


