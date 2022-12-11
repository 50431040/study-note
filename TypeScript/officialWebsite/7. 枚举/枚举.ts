// 数字枚举
{
  enum Direction {
    Up,
    Down,
    Left = 3,
    Right
  }

  console.log(Direction.Down); // 1
  console.log(Direction.Right); // 4
}

// 字符串枚举
{
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
  }
}

// 异构枚举
{
  enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES"
  }
}

// 常量和计算的成员
{
  enum FileAccess {
    // 常量成员
    None,
    Read = 1 << 1,
    Write = 1 << 2,
    ReadWrite = Read | Write,
    G = "123".length // 计算成员
  }
}

{
  // enum ShapeKind {
  //   Circle,
  //   Square
  // }

  // interface Circle {
  //   kind: ShapeKind.Circle;
  //   raduis: number;
  // }

  // interface Square {
  //   kind: ShapeKind.Square;
  //   sideLength: number;
  // }

  // let c: Circle = {
  //   // kind: ShapeKind.Square, // Error
  //   // radius: 100,
  // }
}

// 联合类型
{
  enum E {
    Foo,
    Bar
  }

  function f(x: E) {
    // if (x !== E.Foo || x !== E.Bar) {} // Error
  }
}

// 运行时的枚举
{
  enum E {
    X,
    Y,
    Z
  }

  function f1(obj: { X: number }) {
    return obj.X
  }

  console.log(E)
  f1(E); // 能够正常运行
}

// 反向映射
{
  enum Enum {
    A
  }

  let a = Enum.A;
  let nameOfA = Enum[a];

  console.log(a, nameOfA)
}

// const枚举
{
  const enum Direction {
    Up,
    Down,
    Left,
    Right
  }
  let directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
}

// 外部枚举

declare enum Enum {
    A = 1,
    B,
    C = 2
}