import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateFavoris } from "../middlewares/favoris";
import { getFavoris } from "../utils/favoris";


/**
 * Route me permettant de créer un favoris
 */
export function createFavoris (app : any) {
  // 
  app.post('/api/favoris', verifyToken, checkBodyCreateFavoris, async (req : Request, res: Response, next : any ) => {
    const rep = await getFavoris( req.body.idUser, req.body.idEvent);

    
    if (!rep) {
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
        console.log(error)
        if (error.code === "23505") {
          res.status(501).json({msg : "Favoris déjà ajouté"});
        }
        res.status(501).json({message, data : error});
      })
    } else {
      res.status(501).json({msg : "Favoris déjà ajouté"});
    }
  }) 
} 

