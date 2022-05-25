"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCreneauByEvent = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
function getAllCreneauByEvent(app) {
    app.get('/creneau/:idE', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('SELECT * FROM data.creneau where idEvent = $1', [req.params.idE])
            .then((events) => {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas d'event trouvé avec cet id : ${req.params.idE}`
                });
            }
            return res.status(200).json({
                msg: `Get Creneau : ${req.params.idE}`,
                data: events.rows
            });
        })
            .catch((error) => {
            const message = 'Les events n\'ont pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getAllCreneauByEvent = getAllCreneauByEvent;
