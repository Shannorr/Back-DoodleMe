"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBody = exports.checkDuplicateUsername = void 0;
const postgre_1 = require("../db/postgre");
function checkDuplicateUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const t = yield postgre_1.querywithparametersUser("Select * from data.users where username = $1", [req.body.username]);
        if (t.rows[0]) {
            return res.status(400).send("Votre nom d'utilisateur est déjà utilisé.");
        }
        else {
            next();
        }
    });
}
exports.checkDuplicateUsername = checkDuplicateUsername;
function checkBody(req, res, next) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        return res.status(400).send({ msg: "Votre body est vide" });
    }
    else {
        if (req.body.username === undefined || req.body.lastname === undefined || req.body.firstname === undefined || req.body.password === undefined) {
            return res.status(400).send({ msg: "Veuillez à fournir le username, lastname, firstname et password dans votre body" });
        }
        else if (req.body.username === "" || req.body.lastname === "" || req.body.firstname === "" || req.body.password === "") {
            return res.status(400).send({ msg: "Un des champs fourni est vide" });
        }
    }
    next();
}
exports.checkBody = checkBody;
