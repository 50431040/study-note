const a = require('./commonjs导出')

console.log(a);

setTimeout(() => {
    console.log(a);
}, 2000)