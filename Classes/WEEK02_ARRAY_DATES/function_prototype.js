//Function prototype
function Person(id, name, city) {
    this.id = id
    this.name = name
    this.city = city
}

// Person.prototype.country = "CAN"
Person.prototype.print = function() {
    console.log(this.id)
    console.log(this.name)
    console.log(this.city)
    console.log(this.country)
}
console.log(Person)

var p = new Person(1, "Pritesh", "TOR")
p.print()