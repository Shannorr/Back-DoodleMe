"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db = require('./db/postgre');
const app = express_1.default();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.get("/", (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get("/users", db.getUsers);
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
