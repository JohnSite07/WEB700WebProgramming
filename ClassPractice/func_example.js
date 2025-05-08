//Function Declaration
function sayHello() {
    console.log('Hello Students')
}

//Function Expression
const sayHello1 = function() {
    console.log('Hello Students')
}

//Arrow function
const sayHello2 = () => {
    console.log('Hello Students')
}
const sayHello3 = () => console.log('Hello Students')


function greet(name) {
    //const message = `Welcome, ${name}`
    //return message
    return `Welcome, ${name}`
}

const greet1 = function(name) {
    //const message = `Welcome, ${name}`
    //return message
    return `Welcome, ${name}`
}

const greet2 = name => {
    const message = `Welcome, ${name}`
    return message
}

function add(a, b) {
    return a + b
}

const sub = (a, b) => a + b
const div = (a, b) => a / b
const mul = (a, b) => a * b

//argumentd
function print(...numbers){
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

console.log(print(1, 2, 3, 4, 5))
console.log(print(1, 2, 3))
console.log(print(1, 2, 3, 4, 5, 6, 7))

// print([1, 2, 3, 4, 5, 6], 2, 4)

//arguments
function display() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(display(1, 2, 3, 4, 5))