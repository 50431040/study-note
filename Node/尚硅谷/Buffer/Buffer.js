/**
 * Buffer.from(str) 将字符串转为字节数组
 * Buffer实例打印出来的是十六进制数组，其实存储的是二进制，每个是一个字节(byte)，一个字节包含 8 个 bit(00000000 - 11111111，十六进制最大为ff，十进制最大为 255)
 * Buffer.alloc() 创建一个指定长度的已初始化的 buffer
 * Buffer.allocUnSafe() 未初始化，可能包含敏感的旧数据
 */

const str = 'Hello,jlq'
const buf = Buffer.from(str)
console.log(buf); // <Buffer 48 65 6c 6c 6f 2c 6a 6c 71>

const buf2 = Buffer.alloc(10)
buf2[0] = 10
buf2[1] = 50
buf2[2] = 0x13
console.log(buf2);
console.log(buf2[0]);
console.log(buf2[2].toString(16));

const buf3 = Buffer.allocUnsafe(10)
console.log(buf3);