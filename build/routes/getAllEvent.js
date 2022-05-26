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
exports.getAllEvent = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const users_1 = require("../utils/users");
function getAllEvent(app) {
    app.get('/api/events', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithoutparametersUser('SELECT * FROM data.events')
            .then((events) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({
                msg: "Event created",
                data: yield users_1.addCreator(events.rows)
            });
        }))
            .catch((error) => {
            const message = 'Les events n\'ont pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getAllEvent = getAllEvent;
