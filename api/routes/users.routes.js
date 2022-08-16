"use strict"
let express = require("express");
let controller = require("../controller/users.controller");
let api = express.Router();
//middleware validator
let hash = require("../core/validator-hash.core");
//api methods
api.post("/register", controller.encryptPass, controller.createUser);
api.get("/", hash.decodeToken, controller.validatePrivilegies, controller.getUserData);
api.get("/:id", hash.decodeToken, controller.validatePrivilegies, controller.getUserData);
api.post("/login", controller.login, controller.generateSession);
module.exports = api;