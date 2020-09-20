const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'hello3.txt')
const ws = fs.createWriteStream(file)

ws.on('open', function() {
    console.log('写入流打开');
})

ws.on('close', function() {
    console.log('写入流关闭');
})

ws.write('你还好吗')
ws.end()