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
exports.getCreneauWithHighestResponse = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
function getCreneauWithHighestResponse(app) {
    app.get('/api/creneau/winner/:idE', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('select e.* from data.creneau e where e.idevent = $1 AND e.nbreppositive = (SELECT MAX(nbreppositive) FROM data.creneau where idevent = e.idevent);', [req.params.idE])
            .then((events) => __awaiter(this, void 0, void 0, function* () {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas d'event trouvé avec cet id : ${req.params.idE}`
                });
            }
            return res.status(200).json({
                msg: `Get Event : ${req.params.idE}`,
                data: events.rows
            });
        }))
            .catch((error) => {
            const message = 'Les events n\'ont pas pu être récupérer';
            console.log(error);
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getCreneauWithHighestResponse = getCreneauWithHighestResponse;
