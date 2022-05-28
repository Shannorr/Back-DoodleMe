import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateFavoris } from "../middlewares/favoris";


export function deleteFavoris (app : any) {
  app.delete('/api/favoris', verifyToken, checkBodyCreateFavoris, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('DELETE FROM data.favoris where idevent = $1 and iduser = $2;', 
    [req.body.idEvent, req.body.idUser]
    )
    .then(() => {
      return res.status(200).json({
        msg: "Favoris deleted",
        data: {
          "idEvent": req.body.idEvent,
          "idUser": req.body.idUser
        }
      })
    })
    .catch((error) => {
      const message = 'event n\' a pas pu etre supprimé'
      console.log(error)
      res.status(500).json({message, data : error});
    })
  })
}