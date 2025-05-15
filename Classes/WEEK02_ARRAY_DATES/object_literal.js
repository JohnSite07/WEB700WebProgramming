var obj1 = {
    id: 1,
    firstname: "Pritesh",
    lastname: "Patel",
    city: "Toronto",

    print: function() {
        console.log(this.firstname)
    }
}

console.log(obj1)
console.log("")
console.log(obj1["lastname"])
