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
exports.createReponse = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const reponse_1 = require("../middlewares/reponse");
const reponse_2 = require("../utils/reponse");
function createReponse(app) {
    app.post('/api/reponse', authJwt_1.verifyToken, reponse_1.checkBodyCreateReponse, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        // si ça n'existe pas en bd on rajoute et en fonction de la réponse on fait + ou - 
        const response = yield reponse_2.getReponseByiduserandidcreneau(req.body.idUser, req.body.idCreneau);
        if (!response) {
            postgre_1.querywithparametersUser('INSERT INTO data.reponses (idCreneau, idUser, reponse) VALUES ($1, $2, $3)', [req.body.idCreneau, req.body.idUser, req.body.reponse])
                .then(() => {
                if (req.body.reponse === true) {
                    reponse_2.ajouterUneReponsePositive(req.body.idCreneau);
                }
                // gérer le nombre de réponse positive
                return res.status(200).json({
                    msg: "Reponse created",
                    data: {
                        "idCreneau": req.body.idCreneau,
                        "idUser": req.body.idUser,
                        "reponse": req.body.reponse
                    }
                });
            })
                .catch((error) => {
                const message = 'event n\' a pas pu etre rajouter';
                res.status(500).json({ message, data: error });
            });
        }
        else { // si ça existe en bd on regarde si la réponse est là même
            if (req.body.reponse == response.reponse) {
                res.status(301).json({ msg: "Pas de modification apporté même réponse", data: response });
            }
            else {
                if (req.body.reponse === true) {
                    reponse_2.ajouterUneReponsePositive(req.body.idCreneau);
                    reponse_2.updateReponse(req.body.idUser, req.body.idCreneau, req.body.reponse);
                    return res.status(200).json({
                        msg: "Event modfier +1",
                        data: {
                            "idCreneau": req.body.idCreneau,
                            "idUser": req.body.idUser,
                            "reponse": req.body.reponse
                        }
                    });
                }
                else {
                    reponse_2.enleverUneReponsePositive(req.body.idCreneau);
                    reponse_2.updateReponse(req.body.idUser, req.body.idCreneau, req.body.reponse);
                    return res.status(200).json({
                        msg: "Event modifier -1",
                        data: {
                            "idCreneau": req.body.idCreneau,
                            "idUser": req.body.idUser,
                            "reponse": req.body.reponse
                        }
                    });
                }
            }
        }
    }));
}
exports.createReponse = createReponse;
