"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_json_1 = __importDefault(require("../configs/db.config.json"));
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: db_config_json_1.default.USER,
    host: db_config_json_1.default.HOST,
    database: db_config_json_1.default.DB,
    password: db_config_json_1.default.PASSWORD,
    port: db_config_json_1.default.port,
});
module.exports = {
    querywithparameters: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    querywithoutparameters: (text, callback) => {
        return pool.query(text, callback);
    }
};
