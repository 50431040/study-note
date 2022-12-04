let isDone: boolean = false;

let decLiteral: number = 6;

let name1: string = "jlq";

let list: number[] = [1, 2, 3];
let list2: Array<string> = ["1", "2", "3"];

// tuple
let x: [string, number];
x = ["1", 2];
x[3] = "1";
const xItem = x[3];

// enum
enum Color {
  Red = 1,
  Green,
  Blue
}
const color = Color[2]; // Blue

// any
let notSure: any = 4;
notSure = "123";

// never
function error(message: string): never {
  throw new Error(message);
}

// object
declare function create(o: object | null): void;

create({ prop: 0 });
create(null);
create(42); // Error

// 类型断言
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;