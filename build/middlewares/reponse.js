"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodyCreateReponse = void 0;
function checkBodyCreateReponse(req, res, next) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        return res.status(400).send({ msg: "Votre body est vide" });
    }
    else {
        if (req.body.idCreneau === undefined || req.body.idUser === undefined || req.body.reponse === undefined) {
            return res.status(400).send({ msg: "Veuillez à fournir le name, description, cloture et idcreateur dans votre body" });
        }
        else if (req.body.idCreneau === "" || req.body.idUser === "" || req.body.reponse === "") {
            return res.status(400).send({ msg: "Un des champs fourni est vide" });
        }
    }
    next();
}
exports.checkBodyCreateReponse = checkBodyCreateReponse;
