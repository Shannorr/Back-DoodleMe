"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = require("./routes/auth.routes");
const clotureEvent_1 = require("./routes/clotureEvent");
const createCreneau_1 = require("./routes/createCreneau");
const createEvent_1 = require("./routes/createEvent");
const createFavoris_1 = require("./routes/createFavoris");
const createReponse_1 = require("./routes/createReponse");
const deleteFavoris_1 = require("./routes/deleteFavoris");
const getAllCreneauByEvent_1 = require("./routes/getAllCreneauByEvent");
const getAllEvent_1 = require("./routes/getAllEvent");
const getAllEventCreatedByIdUser_1 = require("./routes/getAllEventCreatedByIdUser");
const getCreneauAvecLePlusGrandNbDeRep_1 = require("./routes/getCreneauAvecLePlusGrandNbDeRep");
const getEventById_1 = require("./routes/getEventById");
const getEventOuUserARepondu_1 = require("./routes/getEventOuUserARepondu");
const getFavorisEventByIdUSer_1 = require("./routes/getFavorisEventByIdUSer");
const getLastEventByIdUser_1 = require("./routes/getLastEventByIdUser");
const getUserById_1 = require("./routes/getUserById");
const getUserByidCreneau_1 = require("./routes/getUserByidCreneau");
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
// post
createFavoris_1.createFavoris(app);
createReponse_1.createReponse(app);
createCreneau_1.createCreneau(app);
createEvent_1.createEvent(app);
// delete
deleteFavoris_1.deleteFavoris(app);
// get
getAllCreneauByEvent_1.getAllCreneauByEvent(app);
getAllEvent_1.getAllEvent(app);
getEventById_1.getEventById(app);
getUserById_1.getUserById(app);
getUserByidCreneau_1.getUserByIdCreneau(app);
getFavorisEventByIdUSer_1.getFavorisEventByIdUser(app);
getEventOuUserARepondu_1.getEventOuUserARepondu(app);
getAllEventCreatedByIdUser_1.getAllEventCreatedByIdUser(app);
getCreneauAvecLePlusGrandNbDeRep_1.getCreneauWithHighestResponse(app);
getLastEventByIdUser_1.getLastEventByIdUser(app);
// patch
clotureEvent_1.closeEvent(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});
