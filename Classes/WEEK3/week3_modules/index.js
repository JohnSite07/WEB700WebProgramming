console.log("Week 03 - NodeJS modules")
const fs = require("fs")
const http = require("http")
const os = require("os")

fs.readFile("data.txt", (err, dataRead) => {
    if(err) {
        console.log(err)
    } else {
        console.log(dataRead.toString())
    }
})
console.log("Week 03 - END")
