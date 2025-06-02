//https://www.npmjs.com/package/express
const express = require('express');
const path = require('path');
const app = express();
const SERVER_PORT = process.env.PORT || 8080; // assign a port

// http://localhost:8080/
app.get('/', (req, res) => {
    res.send('HELLO, Node JS Express Server')
})

//http://localhost:8080/hello
app.get("/hello", (req, res) => {
    res.send("<h1>GET | Welcome to Node + Express</h1>")
})


//http://localhost:8080/hello
app.post("/hello", (req, res) => {
    res.send("<h1>POST | Welcome to Node + Express</h1>")
})

//http://localhost:8080/student/greet
app.get("/student/greet", (req, res) => {
    res.send("<h1>Hello Students</h1>")
})

//http://localhost:8080/student
app.get("/student", (req, res) => {
    const stud = {
        sid: 1,
        fname: "Pritesh",
        lname: "Patel",
        city: "Toronto"
    }

    // res.send(stud)
    res.json(stud)
})

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/contact.html'));
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
})

app.listen(SERVER_PORT, () => {
    console.log('Server started....')
})