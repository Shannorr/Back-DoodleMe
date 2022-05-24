"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.querywithoutparametersUser = exports.querywithparametersUser = void 0;
const db_config_json_1 = __importDefault(require("../configs/db.config.json"));
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: db_config_json_1.default.USER,
    host: db_config_json_1.default.HOST,
    database: db_config_json_1.default.DB,
    password: db_config_json_1.default.PASSWORD,
    port: db_config_json_1.default.port,
});
function querywithparametersUser(text, params) {
    return pool.query(text, params);
}
exports.querywithparametersUser = querywithparametersUser;
function querywithoutparametersUser(text) {
    return pool.query(text);
}
exports.querywithoutparametersUser = querywithoutparametersUser;
