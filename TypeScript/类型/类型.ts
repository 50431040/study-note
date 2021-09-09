// 联合类型
let sex: "male" | "female";
sex = "female";

let a: string | boolean;
a = "123";
a = false;


let b: any = 123;
let k: unknown = "123";
let c: string = "123";

// 可以将any类型的变量赋值给任意类型的变量
c = b;

c = k; // 提示错误，unknown的值不能赋值给其他已经类型的值

c = k as string; // ok


function fn(): void {
  // 三种方式都可以表示void
  // return;
  // return undefined;
  return null;
}

function fn2(): never {
  // 死循环或抛出异常
  // throw new Error("never")
  while (true) { }
}

let obj: {
  name: string,
  age: number,
  sex?: string,
  [propName: string]: any
}

obj = {
  name: "jlq",
  age: 18,
  weight: 52 // 任意属性
};


// 函数结构的类型声明
let fn3: (a: number, b: number) => number
fn3 = function (a: number, b: number) {
  return a + b;
}


let arr: number[];
arr = [1, 2, "123"];

let arr2: Array<string>;
arr2 = [1, 2, "123"];

let arr3: [string, number];
arr3 = ["123", 1];

enum SEX {
  MALE = 10,
  FEMALE = 11
}

console.log(SEX.MALE)
console.log(SEX[10])