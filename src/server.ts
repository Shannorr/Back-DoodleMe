import { Request, Response } from "express";
import { routesLogin } from "./routes/auth.routes";
import { closeEvent } from "./routes/clotureEvent";
import { createCreneau } from "./routes/createCreneau";
import { createEvent } from "./routes/createEvent";
import { createFavoris } from "./routes/createFavoris";
import { createReponse } from "./routes/createReponse";
import { getAllCreneauByEvent } from "./routes/getAllCreneauByEvent";
import { getAllEvent } from "./routes/getAllEvent";
import { getEventById } from "./routes/getEventById";
import { getFavorisEventByIdUser } from "./routes/getFavorisEventByIdUSer";
import { getUserById } from "./routes/getUserById";
import { getUserByIdCreneau } from "./routes/getUserByidCreneau";

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
app.get("/", (req : Request, res : Response) => {
  res.json({ message: "Welcome to dodleMe application." });
});

//Routes
routesLogin(app);
createEvent(app);
getAllEvent(app);
getEventById(app);
getUserById(app);
createCreneau(app);
getAllCreneauByEvent(app);
createReponse(app);
closeEvent(app);
createFavoris(app);
getUserByIdCreneau(app);
getFavorisEventByIdUser(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});