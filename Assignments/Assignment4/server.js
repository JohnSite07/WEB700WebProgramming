/********************************************************************************
* WEB700 – Assignment 04
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
* Name: Jean Luc Sita Mbuya Student ID: 111827242 Date: 7/6/2025
*
* Published URL: https://github.com/JohnSite07/WEB700WebProgramming/blob/main/Assignments/Assignment4/server.js
*
********************************************************************************/
const { error } = require("console");
const LegoData = require("./modules/legoSets");
const legoData = new LegoData();
const express = require('express');
const app = express();
const path = require('path');
const { rejects } = require("assert");

// Static middleware for serving public files
app.use(express.static(__dirname + '/public'));

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

// Test route for adding a new LEGO set
app.get('/lego/add-test', (req, res) => {
    let testSet = {
        set_num: "123",
        name: "testSet name",
        year: "2024",
        theme_id: "366",
        num_parts: "123",
        img_url: "https://fakeimg.pl/375x375?text=[+Lego+]"
    };

    legoData.addSet(testSet)
        .then(() => {
            res.redirect('/lego/sets');
        })
        .catch(err => {
            res.status(422).json({ error: err });
        });
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});