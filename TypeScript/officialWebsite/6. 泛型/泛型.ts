{
  function identity(arg: number): number {
    return arg;
  }

  function identity2<T> (arg: T): T {
    return arg;
  }

  // 传入所有参数，包括类型参数
  let output = identity2<string>("myString");
  let output2 = identity2("myString");
}

{
  function identity3<T> (arg: T): T {
    // console.log(arg.length); // Error
    return arg;
  }

  // T类型数组
  function loggingIdentity<T> (arg: T[]): T[] {
    console.log(arg.length); // Correct
    return arg;
  }
}

// 泛型类型
{
  function identity4<T> (arg: T): T {
    return arg;
  }
  let myIdentity: <T>(arg: T) => T = identity4
  let myIdentity2: <U>(arg: U) => U = identity4

  // 使用带有调用签名的对象字面量来定义泛型函数
  let myIdentity3: { <T>(arg: T): T } = identity4
}

// 泛型接口
{
  interface GenericIdentityFn {
    <T>(arg: T): T;
  }

  function identity5<T>(arg: T): T {
    return arg;
  }

  let myIdentity: GenericIdentityFn = identity5;
}

// 把泛型参数当做整个接口的一个参数
{
  interface GenericIdentityFn<T> {
    (arg: T): T;
  }

  function identity6<T>(arg: T): T {
    return arg;
  }

  let myIdentity: GenericIdentityFn<number> = identity6;
  // myIdentity("1"); // Error
  myIdentity(1);
}

// 泛型类
{
  class GenericNumber<T> {
    // static a: T; // Error
    zeroValue: T;
    add: (x: T, y: T) => T;
  }

  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = (x, y) => {
    return x + y;
  }

}

// 泛型约束
{
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
  }

  // loggingIdentity2(3); // Error
  loggingIdentity2("3");
  loggingIdentity2({
    length: 10,
    value: 3
  });

}

// 约束类型参数
{

  function getProperty<T>(obj: T, key: keyof T) {
    return obj[key];
  }

  let x = {
    a: 1,
    b: 2,
    c: 3
  }

  getProperty(x, "a")
  // getProperty(x, "m") // Error
}

// 泛型里使用类类型
{
  class BeeKeeper {
    hasMask: boolean;
  }

  class ZooKeeper {
    nametag: string;
  }

  class Animal {
    numLegs: number;
  }

  class Bee extends Animal {
    keeper: BeeKeeper
  }

  class Lion extends Animal {
    keeper: ZooKeeper
  }

  function createInstance<A extends Animal>(c: new() => A): A {
    return new c();
  }

  createInstance(Bee).keeper.hasMask;
  createInstance(Lion).keeper.nametag;
}