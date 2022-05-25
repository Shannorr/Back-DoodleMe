import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateCreneau } from "../middlewares/creneau";


export function createCreneau (app : any) {
  app.post('/creneau', verifyToken, checkBodyCreateCreneau, (req : Request, res: Response, next : any ) => {
    console.log(req.body.date, req.body.heureDebut, req.body.idEvent);
    querywithparametersUser('INSERT INTO data.creneau (date, heureDebut, nbRepPositive, idEvent) VALUES ($1, $2, 0, $3)', 
    [req.body.date, req.body.heureDebut, req.body.idEvent]
    )
    .then(() => {
      return res.status(200).json({
        msg: "Creneau created",
        data: {
          "date": req.body.date,
          "heureDebut": req.body.heureDebut,
          "idEvent": req.body.idEvent
        }
      })
    })
    .catch((error) => {
      const message = 'creneau n\' a pas pu etre rajouter'
      res.status(500).json({message, data : error});
    })
  })
}