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
exports.createFavoris = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const favoris_1 = require("../middlewares/favoris");
const favoris_2 = require("../utils/favoris");
function createFavoris(app) {
    // 
    app.post('/api/favoris', authJwt_1.verifyToken, favoris_1.checkBodyCreateFavoris, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const rep = yield favoris_2.getFavoris(req.body.idUser, req.body.idEvent);
        if (!rep) {
            postgre_1.querywithparametersUser('INSERT INTO data.favoris (idEvent, idUser) VALUES ($1, $2)', [req.body.idEvent, req.body.idUser])
                .then(() => {
                return res.status(200).json({
                    msg: "Favoris created",
                    data: {
                        "idEvent": req.body.idEvent,
                        "idUser": req.body.idUser
                    }
                });
            })
                .catch((error) => {
                const message = 'event n\' a pas pu etre rajouter';
                console.log(error);
                if (error.code === "23505") {
                    res.status(304).json({ msg: "Favoris déjà ajouté" });
                }
                res.status(501).json({ message, data: error });
            });
        }
        else {
            res.status(304).json({ msg: "Favoris déjà ajouté" });
        }
    }));
}
exports.createFavoris = createFavoris;
