import express from "express";
      

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Holà nicolas and dsdsds fablito!");
});

app.listen(port, () =>
  console.log(`Notre application Node est démarrée sur http://localhost:${port}`)
);
 
  