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
exports.getEventById = void 0;
const postgre_1 = require("../db/postgre");
const users_1 = require("./users");
function getEventById(idevent) {
    return __awaiter(this, void 0, void 0, function* () {
        const str = 'select * from data.events where idevent = $1';
        const res = yield postgre_1.querywithparametersUser(str, [idevent]);
        const user = yield users_1.getUserbyId(res.rows[0].idcreator);
        // console.log(user)
        return {
            id: res.rows[0].idevent,
            nom: res.rows[0].name,
            description: res.rows[0].description,
            cloture: res.rows[0].cloture,
            createur: {
                iduser: user.iduser,
                username: user.username,
                lastname: user.username,
                firstname: user.username,
            }
        };
    });
}
exports.getEventById = getEventById;
