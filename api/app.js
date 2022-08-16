"use strict"

var express = require("express");
var http = require("http")
var app = express();
const bodyParser = require("body-parser")

//loading public routes
let users = require("./routes/users.routes");

//Usar el request como json
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

//configurar cabeceras http
app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Token"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Lugar donde ser publicara sitio de angular
app.use(express.static("public"));

//apis uses
app.use("/api/users", users);

//se levanta una constante de server
var server = http.createServer(app);
module.exports = server;
