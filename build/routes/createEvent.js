"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const users_1 = require("./users");
function createEvent(app) {
    app.post('/events', authJwt_1.verifyToken, (req, res, next) => {
        console.log("hey");
        postgre_1.querywithparametersUser('INSERT INTO (name, description, cloture, creator) data.events VALUES ($1, $2, $3, $4)', [req.body.name, req.body.description, req.body.cloture, req.body.creator])
            .then((users) => {
            return res.status(200).json({
                msg: "Event created",
                data: {
                    "name": req.body.name,
                    "description": req.body.description,
                    "cloture": req.body.cloture,
                    "creator": users_1.getUserbyId(req.body.id)
                }
            });
        })
            .catch((error) => {
            const message = 'event n\' a pas pu etre rajouter';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.createEvent = createEvent;
