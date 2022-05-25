"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEvent = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
function getAllEvent(app) {
    app.get('/events', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithoutparametersUser('SELECT * FROM data.events')
            .then((events) => {
            return res.status(200).json({
                msg: "Event created",
                data: events.rows
            });
        })
            .catch((error) => {
            const message = 'Les events n\'ont pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getAllEvent = getAllEvent;
