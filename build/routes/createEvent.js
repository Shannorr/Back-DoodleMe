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
const event_2 = require("../utils/event");
function createEvent(app) {
    app.post('/api/events', authJwt_1.verifyToken, event_1.checkBodyCreateEvent, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        postgre_1.querywithparametersUser('INSERT INTO data.events (name, description, cloture, idcreator) VALUES ($1, $2, $3, $4)', [req.body.name, req.body.description, req.body.cloture, req.body.idcreator])
            .then(() => __awaiter(this, void 0, void 0, function* () {
            const creneauTab = req.body.creneauTab;
            // console.log(creneauTab.length);
            const event = yield event_2.getEventIdByName(req.body.name);
            console.log(event);
            for (let i = 0; i < creneauTab.length; i++) {
                createCreneau(creneauTab[i].date, creneauTab[i].heureDebut, event.idevent);
            }
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
    }));
}
exports.createEvent = createEvent;
function createCreneau(date, heureDebut, idevent) {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgre_1.querywithparametersUser('INSERT INTO data.creneau (date, heureDebut, nbRepPositive, idEvent) VALUES ($1, $2, 0, $3)', [date, heureDebut, idevent]);
    });
}
