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
exports.getUserByIdCreneau = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
const users_1 = require("../utils/users");
function getUserByIdCreneau(app) {
    app.get('/api/users/creneau/:idC', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('select u.iduser, u.username, u.lastname, u.firstname, c.idcreneau, r.reponse  from data.users u, data.creneau c, data.reponses r where c.idcreneau = $1 and r.iduser = u.iduser and c.idcreneau = r.idcreneau;', [req.params.idC])
            .then((events) => __awaiter(this, void 0, void 0, function* () {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas utilisateurs trouvé avec cet id : ${req.params.idC}`
                });
            }
            return res.status(200).json({
                msg: `Get Users : ${req.params.idC}`,
                data: yield users_1.addCreatorAndRefactorUser(events.rows)
            });
        }))
            .catch((error) => {
            console.log(error);
            const message = 'Le user n\'a pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getUserByIdCreneau = getUserByIdCreneau;
