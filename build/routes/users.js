"use strict";
// notice here I'm requiring my database adapter file
Object.defineProperty(exports, "__esModule", { value: true });
// and not requiring node-postgres directly
const db = require('../db/postgre');
module.exports = (app) => {
    app.get('/users', (req, res, next) => {
        db.query('SELECT * FROM data.users', '', (err, result) => {
            if (err) {
                return next(err);
            }
            res.status(200).send(result.rows);
        });
    });
};
