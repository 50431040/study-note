for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100 * i)
}

function foo() {
  return a;
}

// 运行时应该抛出错误
// foo();

let a;

foo();

// 数组解构
let input = [1, 2]
let [first, second] = input

// 函数参数解构
function f([first, second]: [number, number]) {
  console.log(first, second)
}

let [firstItem, ...rest] = [1, 2, 3, 4];

let [, secondItem, , fourth] = [1, 2, 3, 4]

// 对象解构

let o = {
  a: "foo",
  b: 12,
  c: "bar"
};

let { a: a1, b } = o;

// ({ a2, b2 } = { a2: "baz", b2: 101 });

// 这里的冒号不是指示类型的，如果想指定它的类型，仍然需要在其后写上完整的模式
let { a: a3, ...passthrough } = o;
let { a: a4 }: { a: string } = o;

// 默认值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 10001 } = wholeObject;
}

// 函数声明默认值
function f1({ a, b = 0 } = { a: "" }) {
  console.log(a, b);
}

f1();
f1({ a: "yes" });
// f1({}); // 报错

// 展开运算符
let first2 = [1, 2];
let second2 = [3, 4];
let bothPlus = [0, ...first2, ...second2, 5];

class C {
  p = 12;
  m() {}
}

let c = new C();
let clone = { ...c };
console.log(clone.p);
clone.m(); // 报错