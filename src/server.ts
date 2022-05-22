import express from "express";
import bodyParser from "body-parser";
const db = require('./db/postgre')

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get("/", (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get("/users", db.getUsers);

app.listen(port, () =>
  console.log(`Notre application Node est démarrée sur http://localhost:${port}`)
);
 
  