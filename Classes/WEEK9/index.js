const express = require('express')
const path = require('path')
const app = express()

const SERVER_PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

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

  res.render('viewData', { data: someData });
});

app.listen(SERVER_PORT, () => {
    console.log('Server started...')
})