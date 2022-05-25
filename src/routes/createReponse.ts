import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateReponse } from "../middlewares/reponse";


export function createReponse (app : any) {
  app.post('/reponse', verifyToken, checkBodyCreateReponse, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('INSERT INTO data.reponses (idCreneau, idUser, reponse) VALUES ($1, $2, $3)', 
    [req.body.idCreneau, req.body.idUser, req.body.reponse]
    )
    .then(() => {
      return res.status(200).json({
        msg: "Event created",
        data: {
          "idCreneau": req.body.idCreneau,
          "idUser": req.body.idUser,
          "reponse": req.body.reponse
        }
      })
    })
    .catch((error) => {
      const message = 'event n\' a pas pu etre rajouter'
      res.status(500).json({message, data : error});
    })
  })
}