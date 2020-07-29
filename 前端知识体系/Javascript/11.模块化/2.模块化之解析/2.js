const name = 'Lebron'
const getName = function() {
    console.log('执行');
    return name
}
var age = 20
const show = function() {
    const name = getName()
    console.log(`this is export show: ${name}`);
}
export {
    name,
    show,
    age
}