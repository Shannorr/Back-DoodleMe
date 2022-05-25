"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeEvent = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
function closeEvent(app) {
    app.patch('/events/:idE', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('UPDATE data.events SET cloture = true WHERE idevent = $1', [req.params.idE])
            .then(() => {
            return res.status(200).json({
                msg: `Event cloturer : ${req.params.idE}`
            });
        })
            .catch((error) => {
            const message = 'event n\' a pas pu etre rajouter';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.closeEvent = closeEvent;
