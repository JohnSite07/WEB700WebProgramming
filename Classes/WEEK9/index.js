const express = require('express')
const path = require('path')
const app = express()

const SERVER_PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('<h1>Welcome to EJS Practice</h1><p><a href="/person">Person</a> | <a href="/viewData">View Data</a> | <a href="/college">College</a></p>')
})

app.get('/person', (req, res) => {
    const user = {
        firstname: "Jean Luc",
        lastname: "Mbuya",
        city: "Toronto"
    }

    res.render('person', { person:user })
})

app.get('/viewData', function (req, res) {
  let someData = {
    name: 'John',
    age: 23,
    occupation: 'developer',
    company: 'Scotiabank',
  };

  res.render('user', { data: someData });
});


app.get("/college", (req, res) => {
  const college = {
    name: "Seneca College",
    city: "Toronto",
    course: "WEB700",
    status: true
  }

  res.render('college', { data: college})
})

app.listen(SERVER_PORT, () => {
    console.log('Server started...')
})