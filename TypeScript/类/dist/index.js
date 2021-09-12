"use strict";
(function () {
    class Person {
        constructor() {
            this.name = "jlq";
            this.age = 18;
            this.height = 180;
        }
        say() {
            console.log('hello');
        }
        static jump() {
            console.log('跳了一下');
        }
    }
    Person.sex = "男";
    let person = new Person();
    console.log(person);
    // console.log(person.sex);
    person.age = 19;
    console.log(person.age);
    // person.height = 190;
    console.log(Person.sex);
    Person.jump();
})();
// 构造函数
(function () {
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        say() {
            console.log(this);
        }
    }
    const person = new Person("jlq", 18);
    const person2 = new Person("ljl", 20);
    console.log(person);
    console.log(person2);
    person.say();
})();
// 继承
(function () {
    class Animal {
        constructor(name) {
            this.name = name;
        }
        bark() {
            console.log('叫了一声');
        }
    }
    class Dog extends Animal {
        eat() {
            console.log('狗吃饭了');
        }
    }
    class Cat extends Animal {
        bark() {
            console.log('喵喵喵');
        }
    }
    const dog = new Dog("小黄");
    dog.eat();
    const cat = new Cat("小白");
    cat.bark();
    console.dir(cat.__proto__);
    debugger;
    console.dir(cat.__proto__.__proto__);
    console.dir(cat);
})();
