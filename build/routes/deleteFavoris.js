"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFavoris = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const favoris_1 = require("../middlewares/favoris");
function deleteFavoris(app) {
    app.delete('/api/favoris', authJwt_1.verifyToken, favoris_1.checkBodyCreateFavoris, (req, res, next) => {
        postgre_1.querywithparametersUser('DELETE FROM data.favoris where idevent = $1 and iduser = $2;', [req.body.idEvent, req.body.idUser])
            .then(() => {
            return res.status(200).json({
                msg: "Favoris deleted",
                data: {
                    "idEvent": req.body.idEvent,
                    "idUser": req.body.idUser
                }
            });
        })
            .catch((error) => {
            const message = 'event n\' a pas pu etre supprimé';
            console.log(error);
            res.status(500).json({ message, data: error });
        });
    });
}
exports.deleteFavoris = deleteFavoris;
