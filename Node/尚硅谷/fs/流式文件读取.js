const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'hello.txt')
const file2 = path.join(__dirname, 'hello4.txt')
const rs = fs.createReadStream(file)
const ws = fs.createWriteStream(file2)

rs.on('open', function() {
    console.log('读取流打开');
})

rs.on('close', function() {
    console.log('读取流关闭');
    ws.end()
})

ws.on('open', function() {
    console.log('写入流开启');
})

ws.on('close', function() {
    console.log('写入流关闭');
})

rs.on('data', function(data) {
    console.log('接收到数据' + data);
    ws.write(data)
})