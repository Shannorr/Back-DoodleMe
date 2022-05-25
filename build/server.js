"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = require("./routes/auth.routes");
const clotureEvent_1 = require("./routes/clotureEvent");
const createCreneau_1 = require("./routes/createCreneau");
const createEvent_1 = require("./routes/createEvent");
const createFavoris_1 = require("./routes/createFavoris");
const createReponse_1 = require("./routes/createReponse");
const getAllCreneauByEvent_1 = require("./routes/getAllCreneauByEvent");
const getAllEvent_1 = require("./routes/getAllEvent");
const getEventById_1 = require("./routes/getEventById");
const getUserById_1 = require("./routes/getUserById");
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
    res.json({ message: "Welcome to dodleMe application." });
});
//Routes
auth_routes_1.routesLogin(app);
createEvent_1.createEvent(app);
getAllEvent_1.getAllEvent(app);
getEventById_1.getEventById(app);
getUserById_1.getUserById(app);
createCreneau_1.createCreneau(app);
getAllCreneauByEvent_1.getAllCreneauByEvent(app);
createReponse_1.createReponse(app);
clotureEvent_1.closeEvent(app);
createFavoris_1.createFavoris(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});
