"use strict";
// notice here I'm requiring my database adapter file
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const postgre_1 = require("../db/postgre");
function getAllUsers(app) {
    app.get('/users', (req, res, next) => {
        postgre_1.querywithoutparametersUser('SELECT * FROM data.users')
            .then((users) => {
            res.status(200).json({
                msg: "Get all users",
                data: users.rows
            });
        })
            .catch((err) => {
            console.log(err);
        });
    });
}
exports.getAllUsers = getAllUsers;
