import { app3 } from './app3'

console.log("1234")

const a = 123;

export const b = 456

export const c = document.getElementById("div")

console.log(app3);

function sum(a, b) {
  return a + b;
}

function cls() {
  console.log(this)
}

type obj = {
  name: string,
  age?: number
}


function fn(p: null | obj) {
  console.log(p.age);
}
