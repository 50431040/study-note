const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'hello.txt')
fs.open(file, 'w', function(err, fd) {
    if (err) {
        console.log('打开失败！');
    }
    fs.write(fd, '456', function(err) {
        if (err) {
            console.log('写入失败！');
        }
        fs.close(fd, function(err) {
            if (err) {
                console.log('关闭失败！');
            }
        })
    })
})