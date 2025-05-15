// class Student {
//     constructor() {
//         sid = 0
//         firstname = ""
//         lastname = ""
//         city = ""
//         result = "" 
//     }
// }

// class Student {
//     constructor() {
//         this.sid = 0
//         this.firstname = ""
//         this.lastname = ""
//         this.city = ""
//         this.result = "" 
//     }
// }

class Student {
    constructor(sid, firstname, lastname, city, result) {
        this.sid = sid
        this.firstname = firstname
        this.lastname = lastname
        this.city = city
        this.result = result
    }

    print = function() {
        console.log("-----------------------------")
        console.log(this.firstname)
        console.log(this.lastname)
        console.log("-----------------------------")
    }

    display = () => {
        console.log("-----------------------------")
        console.log(this.firstname)
        console.log(this.lastname)
        console.log("----------------")
    }
}

var s1 = new Student()
s1.sid = 100
s1.firstname = "First name"
s1.lastname = "Last name"
s1.city = "Toronto"
s1.result = 55

s1.print()
s1.display()

var s2 = new Student(200, "Pritesh", "Patel", "Toronto")
s2.display()