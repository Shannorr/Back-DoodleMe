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
exports.updateReponse = exports.enleverUneReponsePositive = exports.ajouterUneReponsePositive = exports.getReponseByiduserandidcreneau = void 0;
const postgre_1 = require("../db/postgre");
function getReponseByiduserandidcreneau(iduser, idcreaneau) {
    return __awaiter(this, void 0, void 0, function* () {
        const str = 'select * from data.reponses where idcreneau = $1 and iduser = $2;';
        const res = yield postgre_1.querywithparametersUser(str, [idcreaneau, iduser]);
        return res.rows[0];
    });
}
exports.getReponseByiduserandidcreneau = getReponseByiduserandidcreneau;
function ajouterUneReponsePositive(idcreaneau) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield postgre_1.querywithparametersUser("update data.creneau set nbreppositive = nbreppositive +1 where idcreneau = $1;", [idcreaneau]);
        return res.rows[0];
    });
}
exports.ajouterUneReponsePositive = ajouterUneReponsePositive;
function enleverUneReponsePositive(idcreaneau) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield postgre_1.querywithparametersUser("update data.creneau set nbreppositive = nbreppositive -1 where idcreneau = $1;", [idcreaneau]);
        return res.rows[0];
    });
}
exports.enleverUneReponsePositive = enleverUneReponsePositive;
function updateReponse(iduser, idcreaneau, reponse) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield postgre_1.querywithparametersUser("update data.reponses set reponse = $1 where idcreneau = $2 and iduser = $3;", [reponse, idcreaneau, iduser]);
        return res.rows[0];
    });
}
exports.updateReponse = updateReponse;
