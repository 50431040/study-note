interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {
  size: 10,
  label: "Size 10 Object"
}
printLabel(myObj);

// 可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color
  }

  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" })
console.log(mySquare)

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = {
  x: 10,
  y: 20,
};
// p1.x = 5; // Error

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 2; // Error
// ro.push(5); // Error
// ro.length = 100; // Error
// a = ro; // Error

// 可行
a = ro as number[];


// 类型断言
let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
// 索引签名
interface SuqareConfig2 {
  color?: string;
  width?: number;
  [propName: string]: any;
}

// 赋值给一个变量
let squareOptions = { colour: "red", width: 100 };
let mySquare3 = createSquare(squareOptions);

// 函数类型
interface SearchFunc {
  name: string;
  (source: string, subString: string) : boolean;
}

let mySearch: SearchFunc;
mySearch = function(src, sub: string) {
  let result = src.search(sub);
  return result > -1;
}

// 可索引的类型
interface StringArray {
  [index: number]: string;
}

let myArr: StringArray;
myArr = ["Bob", "Fred"];
let myStr: string = myArr[0];

class Animal {
  name: string;
  constructor() {
    this.name = "";
  }
}
class Dog extends Animal {
  breed: string;

  constructor() {
    super();
    this.breed = "";
  }
}

interface NotOkay {
  // [x: number]: Animal; // Error
  [x: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number;
  length: number;
  // name: string; // Error
}

// 防止给索引赋值
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[1] = "Mallory" // Error


// 类类型
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }

  time: any;

  constructor(h: number, m: number) {
    this.currentTime = new Date();
  }
}

interface ClockConstructor {
  new (hour: number, minite: number): ClockInterface;
}
// Error
// class Clock2 implements ClockConstructor {
//   constructor(h: number, m: number) {}
// }

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

createClock(Clock, 1, 1);

const num: number = 1;
// createClock(num, 1, 1); // Error

// 继承接口
interface Shape {
  color: string;
}

interface Square2 extends Shape {
  sideLength: number;
}

let square3 = <Square2>{};
square3.color = "blue";
square3.sideLength = 10;

// 混合类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {
    console.log(start);
  }
  counter.interval = 123;
  counter.reset = function() {
    console.log(this.interval);
  };
  return counter;
}

let c = getCounter();
c(10);
c.interval = 5;
c.reset();
console.log(c);

// 接口继承类
class Control {
  private state: any;

  constructor() {
    this.state = null;
  }
}

interface SelectableControl extends Control {
  select(): void;
}

// Control的子类
class Button extends Control implements SelectableControl {
  select(): void {
    
  }
}

// Control的子类
class TextBox extends Control {
  select() {}
}

// 无法实现，因为没有继承自Control或其子类
class Image implements SelectableControl {
  select(): void {
    
  }
}