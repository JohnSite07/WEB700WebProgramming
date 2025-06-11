/********************************************************************************
* WEB700 – Assignment 03
* * I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* * Name: Sita Jean Luc Mbuya Student ID: 111827242 Date: 6/11/2025
*
* Published URL: https://github.com/JohnSite07/WEB700WebProgramming/blob/main/Assignments/Assignment3/server.js
*
********************************************************************************/
const { error } = require("console");
const LegoData = require("./modules/legoSets");
const legoData = new LegoData();
const express = require('express');
const app = express();
const path = require('path');
const { rejects } = require("assert");

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
        });
    })
    .catch((err) => {
        console.log(`Initialzation failed: ${err}`);
    });

app.get("/lego/sets", (req, res) => {
    if (req.query.theme) {
        legoData.getSetsByTheme(req.query.theme) // query
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
        });
    } else {
        legoData.getAllSets()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
        });
    }
});

app.get('/lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
        });
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});