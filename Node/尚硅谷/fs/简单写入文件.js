const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'hello2.txt')
fs.writeFile(file, '你今天怎么样', function(err) {
    if (err) {
        console.log('写入文件失败！');
    }
})