let today = new Date()

let now = new Date(Date.now())

console.log(now)
console.log(Date.now())
console.log(now.toString())
console.log(now.toDateString())
console.log(now.toTimeString())
console.log(now.getDay())
console.log(now.getDate())
console.log(now.getMonth())
console.log(now.getFullYear())

console.log("--------------------")

let tomorrow = new Date(2025, 0 ,13)
console.log(tomorrow.toString())

console.log("--------------------")

if(today > tomorrow) console.log("today > tomorrow")
if(today < tomorrow) console.log("today > tomorrow")
if(today == tomorrow) console.log("today == tomorrow")