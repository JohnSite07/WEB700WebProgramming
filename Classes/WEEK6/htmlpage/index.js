const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 3000;

const path = require("path");

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.get("/page2", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/page2.html"));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, function(){ 
    console.log(`server listening on: ${HTTP_PORT}` )
});