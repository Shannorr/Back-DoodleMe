"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventById = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
function getEventById(app) {
    app.get('/events/:idE', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('SELECT * FROM data.events where idEvent = $1', [req.params.idE])
            .then((events) => {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas d'event trouvé avec cet id : ${req.params.idE}`
                });
            }
            return res.status(200).json({
                msg: `Get Event : ${req.params.idE}`,
                data: events.rows
            });
        })
            .catch((error) => {
            const message = 'Les events n\'ont pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getEventById = getEventById;
