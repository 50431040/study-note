{
  function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};

    for (let id in first) {
      (<any>result)[id] = first[id]
    }
    for (let id in second) {
      if (!(<any>result).hasOwnProperty(id)) {
        (<any>result)[id] = second[id]
      }
    }
    return result;
  }
  
  class Person {
    constructor(public name: string) {}
  }

  interface Loggable {
    log(): void;
  }

  class ConsoleLogger implements Loggable {
    log() {
      console.log("11")
    }
  }

  var jim = extend(new Person("Jim"), new ConsoleLogger())
  var n = jim.name;
  // jim.log(); // Error
}

{
  interface Bird {
    fly();
    layEggs();
  }

  interface Fish {
    swim();
    layEggs();
  }

  function getSmallPet(): Fish | Bird {

  }

  let pet = getSmallPet();
  pet.layEggs();
  // pet.swim(); // Error
}

{
  
}