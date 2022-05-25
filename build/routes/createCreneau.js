"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreneau = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const creneau_1 = require("../middlewares/creneau");
function createCreneau(app) {
    app.post('/creneau', authJwt_1.verifyToken, creneau_1.checkBodyCreateCreneau, (req, res, next) => {
        console.log(req.body.date, req.body.heureDebut, req.body.idEvent);
        postgre_1.querywithparametersUser('INSERT INTO data.creneau (date, heureDebut, nbRepPositive, idEvent) VALUES ($1, $2, 0, $3)', [req.body.date, req.body.heureDebut, req.body.idEvent])
            .then(() => {
            return res.status(200).json({
                msg: "Creneau created",
                data: {
                    "date": req.body.date,
                    "heureDebut": req.body.heureDebut,
                    "idEvent": req.body.idEvent
                }
            });
        })
            .catch((error) => {
            const message = 'creneau n\' a pas pu etre rajouter';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.createCreneau = createCreneau;
