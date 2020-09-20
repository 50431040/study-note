/**
 * 每个模块都是运行在一个函数中的
 * arguments: 函数的参数
 * arguments.callee: 当前函数
 * exports, require, module, __filename, __dirname
 */


// console.log(arguments);
// console.log(arguments.callee + '');

/**
 * 通过 exports 来导出模块
 * module.exports === exports 
 * 直接将一个对象赋值给 exports 或 module.exports 会切断它们之间的联系，最终导出的是 module.exports
 * 不声明直接定义的变量会添加到 global 上
 */

// console.log(module.exports === exports); // true

// exports = {
//     name: 'Test'
// }
// console.log(module.exports); // {}

// 导出的 name 是 Test
module.exports = {
    name: 'Test'
}
exports.name = 'Test2'

a = '123'
console.log(global);