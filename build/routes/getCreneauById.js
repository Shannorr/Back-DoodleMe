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
exports.getCreneauById = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const creneau_1 = require("../utils/creneau");
function getCreneauById(app) {
    app.get('/api/creneau/creneau/:idC', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('SELECT * FROM data.creneau where idcreneau = $1', [req.params.idC])
            .then((events) => __awaiter(this, void 0, void 0, function* () {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas de creneau trouvé avec cet id : ${req.params.idC}`
                });
            }
            return res.status(200).json({
                msg: `Get creneau : ${req.params.idC}`,
                data: yield creneau_1.addCreatorAndRefactorCreneau(events.rows)
            });
        }))
            .catch((error) => {
            const message = 'Le créneau n\'a pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getCreneauById = getCreneauById;
