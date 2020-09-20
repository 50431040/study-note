/**
 * open => write => close
 * fs.openSync(path[, flags, mode]) 返回一个文件标识符。flags 默认为 'r'，表示只读。
 */

const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'hello.txt')
const fd = fs.openSync(file, 'w')
fs.writeSync(fd, '123')
fs.closeSync(fd)