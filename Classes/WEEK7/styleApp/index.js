const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 3000;

const path = require("path");

app.use(express.static(__dirname + "/views"))
app.use("/css", express.static(__dirname + "/static"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.listen(HTTP_PORT, function(){ 
    console.log(`server listening on: ${HTTP_PORT}` )
});