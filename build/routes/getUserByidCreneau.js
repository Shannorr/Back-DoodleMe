"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdCreneau = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
function getUserByIdCreneau(app) {
    app.get('/users/creneau/:idC', authJwt_1.verifyToken, (req, res, next) => {
        console.log(req.params.idC);
        postgre_1.querywithparametersUser('select u.iduser, u.username, u.lastname, u.firstname, c.idcreneau from data.users u, data.creneau c, data.reponses r where c.idcreneau = $1 and r.iduser = u.iduser and c.idcreneau = r.idcreneau;', [req.params.idC])
            .then((events) => {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas utilisateurs trouvé avec cet id : ${req.params.idC}`
                });
            }
            return res.status(200).json({
                msg: `Get Users : ${req.params.idC}`,
                data: events.rows
            });
        })
            .catch((error) => {
            console.log(error);
            const message = 'Le user n\'a pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getUserByIdCreneau = getUserByIdCreneau;
