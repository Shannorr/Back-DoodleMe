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
exports.getFavoris = void 0;
const postgre_1 = require("../db/postgre");
function getFavoris(iduser, idevent) {
    return __awaiter(this, void 0, void 0, function* () {
        const str = 'select * from data.favoris where idevent = $1 and iduser = $2;';
        const res = yield postgre_1.querywithparametersUser(str, [idevent, iduser]);
        return res.rows[0];
    });
}
exports.getFavoris = getFavoris;
