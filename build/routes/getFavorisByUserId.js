"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const postgre_1 = require("../db/postgre");
const authJwt_1 = require("../middlewares/authJwt");
function getUserById(app) {
    app.get('/users/:idU', authJwt_1.verifyToken, (req, res, next) => {
        postgre_1.querywithparametersUser('SELECT * FROM data.favoris where idUser = $1', [req.params.idU])
            .then((events) => {
            if (events.rowCount === 0) {
                return res.status(400).json({
                    msg: `Pas d'user trouvé avec cet id : ${req.params.idU}`
                });
            }
            return res.status(200).json({
                msg: `Get User : ${req.params.idU}`,
                data: events.rows
            });
        })
            .catch((error) => {
            const message = 'Le user n\'a pas pu être récupérer';
            res.status(500).json({ message, data: error });
        });
    });
}
exports.getUserById = getUserById;
