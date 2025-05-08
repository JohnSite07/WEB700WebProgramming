var a = [1, 2, 3, 4, 5]
console.log(a)
console.log(typeof a)
console.log(a[0])
console.log(a[5])


a[5] = 1000
console.log(a[5])
console.log(a)
console.log(a.length)

a[2] = undefined
console.log(a)

a[5] = undefined
console.log(a)

//Array
let b = Array(5)
b[0] = 10
console.log(typeof b)
console.log(b)

b.push(100)
console.log(b)

b.pop()
console.log(b)
//-----------
var x;
let y
console.log(typeof x)

if(typeof x == undefined || typeof x == 'undefined'){
    console.log('X is undefined')
}