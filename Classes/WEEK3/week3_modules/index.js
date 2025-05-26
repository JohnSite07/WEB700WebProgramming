console.log("Week 03 - NodeJS modules")
const fs = require("fs")
const http = require("http")
const os = require("os")

let msg = require("./modules/message.js")

fs.readFile("data.txt", (err, dataRead) => {
    if(err) {
        console.log(err)
    } else {
        console.log(dataRead.toString())
    }
})

fs.readFile("user.json", (err, dataRead) => {
    if(err) {
        console.log(err)
    }else{
        const user = JSON.parse(dataRead.toString())
        console.log(user)
        console.log(user.name)
    }
})

console.log("Week 03 - END")
console.log(msg.sayHello)
msg.sayHello()
