"use strict";
let jwt = require("jwt-simple");
let moment = require("moment");
let bcrypt = require("bcrypt-nodejs");
let secretKeyToken = "16C2A2A254C8BA984E933C4315982";
const expiredTokenDelay = 3600; /*media hr*/
//const expiredTokenDelay = 7776900; /medio día/
exports.decodeToken = function (tkn) {
    return jwt.decode(tkn, secretKeyToken);
};
exports.createAnyToken = function (model, needExp = false) {
    let payLoad = model;
    if (needExp) payLoad["exp"] = moment().unix() + expiredTokenDelay;
    let hash = jwt.encode(payLoad, secretKeyToken);
    return hash;
};
exports.getHashEncrypt = function (textEncrypt, CB) {
    bcrypt.hash(textEncrypt, null, null, function (e, h) {
        CB(h);
    });
};
exports.compareData = function (textEncrypt, hash, CB) {
    bcrypt.compare(textEncrypt, hash, (e, check) => {
        if (!e) {
            CB(check);
        } else console.log(e);
    });
};

/* secure script */
exports.secureSaveData = function (info) {
    let payLoad = { data: info };
    return jwt.encode(payLoad, "not_this_time");
};

exports.decodeSecureData = function (info) {
    return jwt.decode(info, "not_this_time").data;
};