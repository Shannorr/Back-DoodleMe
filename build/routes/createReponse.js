"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReponse = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const reponse_1 = require("../middlewares/reponse");
function createReponse(app) {
    app.post('/reponse', authJwt_1.verifyToken, reponse_1.checkBodyCreateReponse, (req, res, next) => {
        postgre_1.querywithparametersUser('INSERT INTO data.reponses (idCreneau, idUser, reponse) VALUES ($1, $2, $3)', [req.body.idCreneau, req.body.idUser, req.body.reponse])
            .then(() => {
            // gérer le nombre de réponse positive
            return res.status(200).json({
                msg: "Event created",
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
    });
}
exports.createReponse = createReponse;
