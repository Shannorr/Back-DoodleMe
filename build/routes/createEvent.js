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
exports.createEvent = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const event_1 = require("../middlewares/event");
function createEvent(app) {
    app.post('/events', authJwt_1.verifyToken, event_1.checkBodyCreateEvent, (req, res, next) => {
        postgre_1.querywithparametersUser('INSERT INTO data.events (nom, description, cloture, createur) VALUES ($1, $2, $3, $4)', [req.body.name, req.body.description, req.body.cloture, req.body.idcreator])
            .then((users) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({
                msg: "Event created",
                data: {
                    "name": req.body.name,
                    "description": req.body.description,
                    "cloture": req.body.cloture,
                    "creator": req.body.idcreator
                }
            });
        }))
            .catch((error) => {
            const message = 'event n\' a pas pu etre rajouter';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.createEvent = createEvent;
