class Greeter {
  gretting: string;
  constructor(message: string) {
    this.gretting = message;
  }

  greet() {
    return "Hello, " + this.gretting;
  }
}

let gretter = new Greeter("word");

// 继承
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!Woof");
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();


{
  class Animal {
    name: string;
    constructor(theName: string) {
      this.name = theName;
    }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}`);
    }
  }

  class Snake extends Animal {
    constructor(name: string) {
      super(name);
    }
    move(distanceInMeters = 5) {
      console.log("Slithering....");
      super.move(distanceInMeters);
    }
  }

  let sam = new Snake("Sammy the Python");
  // 多态
  let tom: Animal = new Snake("Tommy");
}

// 私有属性
{
  class Animal {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }
  // new Animal("Cat").name; // Error
}

// 比较两种不同的类型时，如果所有成员的类型都是兼容的，那么就认为它们的类型时兼容的。然而，当我们比较带有`private`或`protected`成员的类型时，如果其中一个类型里包含一个`private`成员，那么只有当另外一个类型中也存在这样一个`private`成员，并且它们都是来自同一处声明时，才认为这两个类型时兼容的。
{
  class Animal {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  class Rhino extends Animal {
    constructor() {
      super("Rhino");
    }
  }

  class Employee {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  let animal = new Animal("Goat");
  let rhino = new Rhino();
  let employee = new Employee("Bob");

  animal = rhino;
  // animal = employee; // Error 如果都用public修饰的话可行
}

// protected
{
  class Person {
    protected name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }

  }

  let howard = new Employee("Howard", "Sales");
  console.log(howard.getElevatorPitch());
  // console.log(howard.name); // Error
}

// 构造函数被标记成protected
{
  class Person {
    protected name: string;
    protected constructor(name: string) {
      this.name = name;
    }
  }

  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}`;
    }

  }

  let howard = new Employee("Howard", "Sales");
  // let john = new Person("John"); Error
}

// readonly
{
  class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 0;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  let dad = new Octopus("Man with the 8 strong legs");
  // dad.name = "Man with"; // Error
}

// 同时创建和初始化成员
{
  class Octopus {
    readonly numberOfLegs: number = 8;
    // nestJS
    constructor(readonly name: string) {

    }
  }
}

// 存取器
{
  let passcode = "secret passcode";

  class Employee {
    constructor(private _fullName: string) {

    }

    get fullName(): string {
      return this._fullName;
    }

    set fullName(newName: string) {
      if (passcode && passcode === "secret passcode") {
        this._fullName = newName;
      } else {
        console.log("Error: Unauthorized");
      }
    }
  }

  let employee = new Employee("Bob Smith");
  employee.fullName = "Bob Smith2";
  if (employee.fullName) {
    console.log(employee.fullName);
  }
}

// 静态成员
{
  class Grid {
    constructor(public scale: number) {}

    static origin = {
      x: 0,
      y: 0
    }

    calculateDistanceFromOrigin(point: { x: number, y: number }) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
  }

  let grid1 = new Grid(1.0);
  let grid2 = new Grid(5.0);

  console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
  console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
}

// 抽象类
{
  abstract class Animal {
    abstract makeSound(): void;
    move(): void {
      console.log("roaming the earch");
    }
  }

  abstract class Department {
    constructor(public name: string) {}

    printName(): void {
      console.log("Department name: " + this.name);
    }

    // 必须在派生类中实现
    abstract printMeeting(): void;
  }

  class AccountingDepartment extends Department {
    constructor() {
      super("Accouting and Auditing");
    }

    printMeeting(): void {
      console.log("The Accounting Department meets each Monday at 10am");
    }

    generateReports(): void {
      console.log("Gemerating accounting reports");
    }
  }

  let department: Department;
  // department = new Department(); // Error 不能创建一个抽象类的实例
  department = new AccountingDepartment();
  department.printName();
  department.printMeeting();
  // department.generateReports(); // Error 方法在声明的抽象类中不存在，因为department的类型为Department
}