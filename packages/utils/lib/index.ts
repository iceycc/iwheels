'use strict';
function index() {
    // TODO
    console.log('hello')
}
// module.exports = index // 打包报错 index.js:15 Uncaught ReferenceError: module is not defined
export default index
