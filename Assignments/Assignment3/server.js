const { error } = require("console");
const LegoData = require("./modules/legoSets");
const legoData = new LegoData();
const express = require('express');
const app = express();
const path = require('path')

const HTTP_PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/home.html'));
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/about.html'));
})

legoData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
        console.log("Server started...")
        })
    })
    .catch((err) => {
        console.log(`Initialzation failed: ${err}`)
    })
