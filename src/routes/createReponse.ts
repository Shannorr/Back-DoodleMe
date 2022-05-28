import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateReponse } from "../middlewares/reponse";
import { ajouterUneReponsePositive, enleverUneReponsePositive, getReponseByiduserandidcreneau, updateReponse } from "../utils/reponse";


export function createReponse (app : any) {
  app.post('/api/reponse', verifyToken, checkBodyCreateReponse, async (req : Request, res: Response, next : any ) => {

    // si ça n'existe pas en bd on rajoute et en fonction de la réponse on fait + ou - 
    const response = await getReponseByiduserandidcreneau(req.body.idUser, req.body.idCreneau);
    if (!response) {
      querywithparametersUser('INSERT INTO data.reponses (idCreneau, idUser, reponse) VALUES ($1, $2, $3)', 
      [req.body.idCreneau, req.body.idUser, req.body.reponse]
      )
      .then(() => {
        
        if (req.body.reponse === true) {
          ajouterUneReponsePositive(req.body.idCreneau);
        }
        // gérer le nombre de réponse positive
        return res.status(200).json({
          msg: "Reponse created",
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
    } else { // si ça existe en bd on regarde si la réponse est là même
      if (req.body.reponse == response.reponse) {
        res.status(500).json({msg : "Pas de modification apporté même réponse", data : response});
      } else {
        if (req.body.reponse === true) {
          ajouterUneReponsePositive(req.body.idCreneau);
          updateReponse(req.body.idCreneau, req.body.idUser, req.body.reponse);
          return res.status(200).json({
            msg: "Event modfier +1",
            data: {
              "idCreneau": req.body.idCreneau,
              "idUser": req.body.idUser,
              "reponse": req.body.reponse
            }
          });
        } else {
          enleverUneReponsePositive(req.body.idCreneau);
          updateReponse(req.body.idUser, req.body.idCreneau, req.body.reponse)
          return res.status(200).json({
            msg: "Event modifier -1",
            data: {
              "idCreneau": req.body.idCreneau,
              "idUser": req.body.idUser,
              "reponse": req.body.reponse
            }
          });
        }
      }

    }
    

    
  })
}