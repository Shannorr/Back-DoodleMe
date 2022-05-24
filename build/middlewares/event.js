"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodyCreateEvent = void 0;
function checkBodyCreateEvent(req, res, next) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        return res.status(400).send({ msg: "Votre body est vide" });
    }
    else {
        if (req.body.name === undefined || req.body.description === undefined || req.body.cloture === undefined || req.body.idcreator === undefined) {
            return res.status(400).send({ msg: "Veuillez à fournir le name, description, cloture et idcreateur dans votre body" });
        }
        else if (req.body.name === "" || req.body.cloture === "" || req.body.idcreator === "") {
            return res.status(400).send({ msg: "Un des champs fourni est vide" });
        }
    }
    next();
}
exports.checkBodyCreateEvent = checkBodyCreateEvent;
