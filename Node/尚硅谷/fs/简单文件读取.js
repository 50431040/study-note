const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, 'hello.txt')
const data = fs.readFileSync(file)
console.log(data.toString());