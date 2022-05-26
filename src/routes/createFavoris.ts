import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateFavoris } from "../middlewares/favoris";


export function createFavoris (app : any) {
  app.post('/api/favoris', verifyToken, checkBodyCreateFavoris, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('INSERT INTO data.favoris (idEvent, idUser) VALUES ($1, $2)', 
    [req.body.idEvent, req.body.idUser]
    )
    .then(() => {
      return res.status(200).json({
        msg: "Favoris created",
        data: {
          "idEvent": req.body.idEvent,
          "idUser": req.body.idUser
        }
      })
    })
    .catch((error) => {
      const message = 'event n\' a pas pu etre rajouter'
      res.status(500).json({message, data : error});
    })
  })
}