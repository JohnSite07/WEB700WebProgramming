console.log("Week 02")

// console.log(console)
// console.log(Array)

const a = Array(1, 2, 3, 4, 5)
console.log(a)

// a.forEach((value, index, a) => {
//     console.log(`${index} ${value}`)
// })

console.log(" --- --- --- ")

let fn = (value, index, a) => {
    console.log(`${index} ${value}`)
}

a.forEach(fn)

console.log(" --- --- --- ")

for (let index=0; index < a.length; index++) {
    console.log(`${index} ${a[index]}`)
}

console.log(" --- --- --- ")

for(let v of a) {
    console.log(v)
}

console.log(" --- --- --- ")

let b = a.map(x => {
    return x * x
})
console.log(b)

console.log(" --- --- --- ")

let c = a.filter(x => {
    return x % 2 == 0
})

console.log(c)

console.log(" --- --- --- ")

let r = a.reduce((p, c) => {
    return p + c
})
console.log(r)

// String

let str = "Hello World"
for(let c of str){
    console.log(c)
}


for(let i = 0; i < str.length; i++){
    console.log(str.charAt(i))
}

console.log(str.toLowerCase())
console.log(str.toUpperCase())
console.log(str.startsWith("H"))
console.log(str.endsWith("H"))
console.log(str.indexOf("H"))
console.log(str.substring(3, 5))//"lo"
console.log(str.substring(3, 7))//"lo w"

