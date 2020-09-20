/**
 * fs.statSync 读取文件信息
 * fs.existsSync 文件或文件夹是否存在
 * fs.unlinkSync 删除文件
 * fs.truncateSync 截取文件
 * fs.mkdir 创建文件夹
 * fs.renameSync 重命名
 * fs.watchFile 监听文件变化
 */

const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'hello2.txt')
// fs.stat(file, function(err, stats) {
//     if (err) {
//         console.log('操作失败');
//     }
//     console.log(stats.size);
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
// })

// const isExists = fs.existsSync(file)
// console.log(isExists);

// fs.unlink(file, function(err) {
//     if (err) {
//         console.log('删除失败！');
//     }
// })

// fs.readdir('.', function(err, files) {
//     if (err) {
//         console.log('读取目录失败');
//     }
//     console.log(files);
// })

// fs.truncateSync(path.join(__dirname, 'hello2.txt'), 6)

// fs.mkdirSync(path.join(__dirname, 'hello'))

// fs.renameSync(file, path.join(__dirname, 'hello5.txt'))

fs.watchFile('hello5.txt', { interval: 1000 }, function(curr, prev) {
    console.log('修改前的文件大小：' + prev.size);
    console.log('修改后的文件大小：' + curr.size);
})