"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = require("./routes/auth.routes");
const users_1 = require("./routes/users");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});
users_1.getAllUsers(app);
auth_routes_1.routesLogin(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});
