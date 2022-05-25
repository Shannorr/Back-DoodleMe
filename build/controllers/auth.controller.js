"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postgre_1 = require("../db/postgre");
const personne_1 = require("../models/personne");
const config = __importStar(require("../configs/auth.config.json"));
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            postgre_1.querywithparametersUser("INSERT INTO data.users (username, lastname, firstname, password) VALUES ($1, $2, $3, $4);", [req.body.username, req.body.lastname, req.body.firstname, bcryptjs_1.default.hashSync(req.body.password, 8)]);
            return res.status(201).json({ msg: 'Utilsateur créer avec succès!', data: req.body });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.signup = signup;
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.body.username === undefined || req.body.password === undefined) {
            return res.status(400).send({ msg: "Le username ou le password est absent" });
        }
        else if (req.body.username === "" || req.body.password === "") {
            return res.status(400).send({ msg: "Le username ou le password est vide" });
        }
        else {
            personne_1.getUserByUserName(req.body.username)
                .then((user) => {
                if (!user) {
                    return res.status(404).send({ msg: "Pas d'utilisateur trouvé" });
                }
                const passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, user.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password!"
                    });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.iduser }, config.secret, {
                    expiresIn: 15000
                });
                return res.status(200).send({
                    id: user.iduser,
                    username: user.username,
                    lastname: user.lastname,
                    firstname: user.firstname,
                    accessToken: token
                });
            })
                .catch((err) => console.log(err));
        }
    });
}
exports.signin = signin;
