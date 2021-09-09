let s: string = "123";
let b: boolean = false;
let n: number = 123;


// 声明时不指定类型且不赋值，隐式判断为any类型
let str1;
str1 = "123";
str1 = 12;

// 声明时不指定类型且直接赋值，会自动推断类型
let str2 = "123";
str2 = 1; // 类型自动推断，无法赋值


function add(a: number, b: number): number {
  return a + b;
}