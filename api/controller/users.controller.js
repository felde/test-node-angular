"use strict"
let data = require("../core/data-access.core");
let jwt = require("../core/jwt.core");
const collectionController = "test-users";
/**
 * 
 * User Model
 * {
 * email:string;
 * password:string;
 * rol:number
 * }
 */
module.exports = {
    encryptPass: async (req, res, next) => {
        if (req.body) {
            jwt.getHashEncrypt(req.body.password, (hash) => {
                req.body.password = hash;
                next();
            })
        }
        else res.status(400).send({ code: 400, msg: "missing data", data: null });
    },
    createUser: async (req, res, next) => {
        if (req.body) {
            data
                .setData(collectionController, Array.isArray(req.body) ? req.body : [req.body])
                .then((resultDocument) => {
                    res.status(200).send({ code: 200, msg: "ok", data: resultDocument });
                });//Esto ya que el metodo usando es insert many
        }
        else res.status(400).send({ code: 400, msg: "missing data", data: null });
    },
    login: async (req, res, next) => {
        if (req.body.email && req.body.password) {
            data
                .getDataObj(collectionController, { email: req.body.email })
                .then((user) => {
                    if (user.length > 0) {
                        jwt.compareData(req.body.password, user[0].password, (result) => {
                            if (!result)//valida si existe un resultado erroneo
                                res
                                    .status(404)
                                    .send({ code: 404, msg: "login failed", data: null });
                            else {
                                req.userData = user[0];
                                next();
                            }
                        });
                    } else
                        res
                            .status(404)
                            .send({ code: 404, msg: "user not found", data: null });
                })
                .catch((err) =>
                    res.status(503).send({ code: 503, msg: err, data: null })
                );
        } else
            res
                .status(400)
                .send({ code: 400, msg: "missing credentials data", data: null });
    },
    generateSession: (req, res) => {
        if (req.userData) {
            let userResponse = {
                email: req.userData.email,
                rol: req.userData.rol
            };
            res.status(200).send({
                code: 200,
                msg: "ok",
                data: jwt.createAnyToken(userResponse, true),
            });
        } else
            res.status(503).send({ code: 503, msg: "something fail", data: null });
    },
    validatePrivilegies: (req, res, next) => {
        if (req.userData) {
            if (req.userData.rol == 1) next()
            else res.status(503).send({ code: 503, msg: "you cant view this data", data: null });
        } else
            res.status(503).send({ code: 503, msg: "something fail", data: null });
    },
    getUserData: (req, res) => {
        let result =
            req.params.id != null
                ? data.getDataByID(collectionController, req.params.id)
                : data.getDataObj(collectionController);
        result.then((d) => {
            if (d) {
                let response = { msg: "ok", code: 200, data: d };
                res.status(200).send(response);
            } else
                res.status(404).send({
                    msg: "err",
                    code: 404,
                    data: "no records returned",
                });
        });
    },
}