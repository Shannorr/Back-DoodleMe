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
<<<<<<< HEAD
exports.addCreatorAndRefactorCreneau = exports.getIdCreneauBy = void 0;
const postgre_1 = require("../db/postgre");
const event_1 = require("./event");
function getIdCreneauBy(iduser, idevent) {
    return __awaiter(this, void 0, void 0, function* () {
        const str = 'select * from data.favoris';
        const res = yield postgre_1.querywithparametersUser(str, [idevent, iduser]);
        return res.rows[0];
    });
}
exports.getIdCreneauBy = getIdCreneauBy;
function addCreatorAndRefactorCreneau(rows) {
    return __awaiter(this, void 0, void 0, function* () {
        const returnrep = [];
        for (let i = 0; i < rows.length; i++) {
            const events = yield event_1.getEventById(rows[i].idevent);
            // console.log(events)
            const rep = {
                evenement: events,
=======
exports.addCreatorAndRefactorCreneau = void 0;
// notice here I'm requiring my database adapter file
const postgre_1 = require("../db/postgre");
const users_1 = require("./users");
function addCreatorAndRefactorCreneau(rows) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(rows)
        const returnrep = [];
        for (let i = 0; i < rows.length; i++) {
            const eventContent = yield getEventById(rows[i].idevent);
            const resp = yield users_1.getUserbyId(eventContent.idcreator);
            // console.log(eventContent)
            const rep = {
                evenement: {
                    id: eventContent.idevent,
                    nom: eventContent.name,
                    description: eventContent.description,
                    cloture: eventContent.cloture,
                    createur: {
                        iduser: resp.iduser,
                        username: resp.username,
                        lastname: resp.lastname,
                        firstname: resp.firstname
                    }
                },
>>>>>>> eaab12de729d06aafa87cb865b9174b8932f8fd4
                id: rows[i].idcreneau,
                date: rows[i].date,
                heureDebut: rows[i].heuredebut,
                nbRepPositive: rows[i].nbreppositive
            };
            returnrep.push(rep);
        }
<<<<<<< HEAD
        ;
=======
        // console.log(returnrep);
>>>>>>> eaab12de729d06aafa87cb865b9174b8932f8fd4
        return returnrep;
    });
}
exports.addCreatorAndRefactorCreneau = addCreatorAndRefactorCreneau;
<<<<<<< HEAD
=======
function getEventById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield postgre_1.querywithparametersUser('SELECT * FROM data.events WHERE idevent = $1', [id]);
        return res.rows[0];
    });
}
>>>>>>> eaab12de729d06aafa87cb865b9174b8932f8fd4
