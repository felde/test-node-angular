"use strict";
let jwt = require("./jwt.core");
let moment = require("moment");
exports.decodeToken = function (rq, rs, nxt) {
    rq.uniquePetition = new Date().getTime();
    if (!rq.headers.token) {
        return rs.status(406).send({ message: "No token include in the header" });
    }
    try {
        let x = jwt.decodeToken(rq.headers.token);
        if (x.exp < moment().unix()) {
            return rs
                .status(200)
                .send({ code: 401, msg: "The token is expired", data: null });
        } else {
            rq.userData = x;
            rq.token = rq.headers.token;
        }
    } catch (ex) {
        console.log(ex.message, rq.uniquePetition);
        if (ex.message === "Token expired")
            return rs.status(440).send({ message: "The token is expired" });
        else return rs.status(408).send({ message: "Token altered" });
    }
    nxt();
};