const LegoData = require("./modules/legoSets");
const legoData = new LegoData();
const express = require('express');
const app = express();
const path = require('path')

// Static middleware for serving public files
app.use(express.static(__dirname + '/public'));

const HTTP_PORT = process.env.PORT || 8080;