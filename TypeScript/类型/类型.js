// 联合类型
var sex;
sex = "female";
var a;
a = "123";
a = false;
var b = 123;
var k = "123";
var c = "123";
// 可以将any类型的变量赋值给任意类型的变量
c = b;
c = k; // 提示错误，unknown的值不能赋值给其他已经类型的值
c = k; // ok
function fn() {
    // 三种方式都可以表示void
    // return;
    // return undefined;
    return null;
}
function fn2() {
    // 死循环或抛出异常
    // throw new Error("never")
    while (true) { }
}
var obj;
obj = {
    name: "jlq",
    age: 18,
    weight: 52 // 任意属性
};
// 函数结构的类型声明
var fn3;
fn3 = function (a, b) {
    return a + b;
};
var arr;
arr = [1, 2, "123"];
var arr2;
arr2 = [1, 2, "123"];
var arr3;
arr3 = ["123", 1];
var SEX;
(function (SEX) {
    SEX[SEX["MALE"] = 10] = "MALE";
    SEX[SEX["FEMALE"] = 11] = "FEMALE";
})(SEX || (SEX = {}));
console.log(SEX.MALE);
console.log(SEX[10]);
