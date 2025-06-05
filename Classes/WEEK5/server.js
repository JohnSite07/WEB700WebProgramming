const express = require('express')

const app = express()
const SERVER_PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.all('/test', (req, res) => {
    res.send("<h1>Server is running...</h1>")
})

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

//Query 
//http://localhost:3000/product?category=electronics test&subcategory=computer
app.get('/product', (req, res) => {
    const query = req.query
    //console.log(query)
    const category = query.category
    const subcategory = query.subcategory
    res.send(query)
})

//Path Parms 
//http://localhost:3000/employee/Pritesh/Patel
app.get('/employee/:fnm/:lnm', (req, res) => {
    const params = req.params
    console.log(params)
    const firstName = params.fnm
    const lastName = params.lnm
    res.send(params)
})

//Body Parms 
// {
//     "fname": "Pritesh",
//     "lname": "Patel"
// }
//http://localhost:3000/employee
app.post('/employee', (req, res) => {
    const bodyData = req.body
    console.log(bodyData)
    const firstName = bodyData.fname
    const lastName = bodyData.fname
    res.send(bodyData)
})

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`)
})