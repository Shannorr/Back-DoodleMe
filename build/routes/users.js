"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserbyId = void 0;
// notice here I'm requiring my database adapter file
const postgre_1 = require("../db/postgre");
function getUserbyId(id) {
    postgre_1.querywithparametersUser('SELECT * FROM data.users WHERE id = $1', [id])
        .then((users) => {
        return {
            msg: "Get all users",
            data: users.rows
        };
    })
        .catch((err) => {
        console.log(err);
    });
}
exports.getUserbyId = getUserbyId;
