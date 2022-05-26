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
exports.addCreatorAndRefactor = exports.addCreator = void 0;
// notice here I'm requiring my database adapter file
const postgre_1 = require("../db/postgre");
function getUserbyId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield postgre_1.querywithparametersUser('SELECT iduser, username, lastname, firstname FROM data.users WHERE idUser = $1', [id]);
        return res.rows[0];
    });
}
function addCreator(rows) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < rows.length; i++) {
            console.log(rows[i].idcreator);
            const resp = yield getUserbyId(rows[i].idcreator);
            rows[i].idcreator = resp;
        }
        console.log(rows);
        return rows;
    });
}
exports.addCreator = addCreator;
function addCreatorAndRefactor(rows) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < rows.length; i++) {
            console.log(rows[i].idcreator);
            const resp = yield getUserbyId(rows[i].idcreator);
            rows[i].idcreator = resp;
        }
        console.log(rows);
        return rows;
    });
}
exports.addCreatorAndRefactor = addCreatorAndRefactor;
