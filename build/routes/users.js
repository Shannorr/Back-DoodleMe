"use strict";
// notice here I'm requiring my database adapter file
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.getAllUsers = void 0;
// and not requiring node-postgres directly
const db = require('../db/postgre');
function getAllUsers(app) {
    app.get('/users', (req, res, next) => {
        db.querywithoutparameters('SELECT * FROM data.users', (err, result) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(result.rows);
        });
    });
}
exports.getAllUsers = getAllUsers;
function login(app) {
    app.post('/login', (req, res, next) => {
        db.querywithoutparameters('SELECT * FROM data.users', (err, result) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(result.rows);
        });
    });
}
exports.login = login;
