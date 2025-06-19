const LegoData = require("./modules/legoSet")
const legoData = new LegoData();
const express = require('express')
const app = express()
const path = require('path')

const HTTP_PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'))
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'))
})

legoData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server started...")
        })
    })
    .catch((err) => {
        console.log(`Initialization failed: ${err}`)
    })

app.get("/lego/sets", (req, res) => {
    if (req.query.theme) {
        legoData.getSetsByTheme(req.query.theme)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(404).sendFile(path.join(__dirname, 'views/404.html'))
        })
    } else {
        legoData.getAllsSets()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).sendFile(path.join(__dirname, 'views/404.html'))
        })
    }
})

app.get('/lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num)
        .then(data => {
            res.json(data)
        })
        .catch((err) => {
            res.status(404).sendFile(path.join(__dirname, 'views/404.html'))
    })
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'))
})