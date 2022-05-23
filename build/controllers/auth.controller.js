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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db = require('../db/postgre');
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body.username, req.body.lastname, req.body.firstname, req.body.password);
        try {
            db.querywithparameters("INSERT INTO data.users (username, lastname, firstname, password) VALUES ($1, $2, $3, $4);", [req.body.username, req.body.lastname, req.body.firstname, bcryptjs_1.default.hashSync(req.body.password, 8)], (err, result) => {
                if (err) {
                    return err;
                }
                res.status(200).send({
                    msg: `L'utilisateur ${req.body.username} a bien été ajouté`
                });
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.signup = signup;
