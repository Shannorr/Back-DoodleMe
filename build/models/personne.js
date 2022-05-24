"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUserName = void 0;
const postgre_1 = require("../db/postgre");
function getUserByUserName(username) {
    return postgre_1.querywithparametersUser("SELECT * FROM data.users where username = $1", [username]).then((result) => result.rows[0]);
}
exports.getUserByUserName = getUserByUserName;
