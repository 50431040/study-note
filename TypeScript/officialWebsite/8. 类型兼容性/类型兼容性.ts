{
  interface Named {
    name: string;
  }

  let x: Named;
  let y = { name: "Alice", location: "Seattle" };
  x = y;
}

// 要查看x是否能赋值给y，首先看它们的参数列表。 x的每个参数必须能在y里找到对应类型的参数。
{
  let x = (a: number) => 0;
  let y = (b: number, s: string) => 0;

  y = x;
  // x = y; // Error
}

// 类型系统强制源函数的返回值类型必须是目标函数返回值类型的子类型。
{
  let x = () => ({ name: "Alice" })
  let y = () => ({ name: "Alice", location: "Seattle" })

  x = y;
  // y = x; // Error
}

// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。
{
  enum Status {
    Ready,
    Waiting
  }

  enum Color {
    Red,
    Blue
  }

  let x = 0;
  x = Status.Ready; // OK

  let status = Status.Waiting;
  // status = Color.Red; // Error
}

// 类类型比较
{
  class Animal {
    feet?: number;
    constructor(name: string, numFeet: number) {}
  }

  class Size {
    feet?: number;
    constructor(numFeet: number) {}
  }
  
  let a: Animal = {};
  let size: Size = {};

  a= size;
  size = a;
}

{
  class Animal {
    private name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  class Cat extends Animal {
    private age: number;

    constructor(name: string, age: number) {
      super(name);
      this.age = age;
    }
  }

  let a: Animal = new Animal("11");
  let c: Cat = new Cat("11", 12);

  a = c;
  // c = a;
}

// 泛型
{
  interface Empty<T> {

  }

  let x: Empty<number>;
  let y: Empty<string>;

  // 兼容
  x = y;
}

{
  interface Empty<T> {
    // 加上一个成员后类型将不兼容
    data: T;
  }

  let x: Empty<number>;
  let y: Empty<string>;

  x = y; // Error
}

{
  let identity = function<T>(x: T): T {
    return x;
  }

  let reverse = function<U>(y: U): U {
    return y
  }

  // OK
  identity = reverse
}