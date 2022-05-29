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
exports.getEventOuUserARepondu = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const users_1 = require("../utils/users");
function getEventOuUserARepondu(app) {
    app.get('/api/users/reponse/:idU', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('select distinct e.*, c.*, r.reponse from data.users u, data.creneau c, data.reponses r, data.events e where u.iduser = $1 AND u.iduser = r.iduser AND r.idcreneau = c.idcreneau AND c.idevent = e.idevent;', [req.params.idU])
            .then((events) => __awaiter(this, void 0, void 0, function* () {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas d'event trouvé avec cet id : ${req.params.idU}`
                });
            }
            return res.status(200).json({
                msg: `Get Event : ${req.params.idU}`,
                data: yield users_1.addCreatorAndRefactorReponse(events.rows)
            });
        }))
            .catch((error) => {
            const message = 'Les events n\'ont pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getEventOuUserARepondu = getEventOuUserARepondu;
