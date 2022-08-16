'use strict'
var app = require("./app");
var port = process.env.PORT || 8080;// se valida si existen el puerto en variables de entorno
var host = process.env.HOST || "http://localhost";// se valida si existen un host en variables de entorno
app.listen(port, () => console.log(`Api serve is running ${host}/${port}`));