import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { addCreatorAndRefactorCreneau } from "../utils/creneau";

/**
 * Route me permettant de récupérer un créneau par son id
 * @param app 
 */
export function getCreneauById (app : any) {
  app.get('/api/creneau/creneau/:idC', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('SELECT * FROM data.creneau where idcreneau = $1', [req.params.idC])
    .then(async (events) => {
      if (events.rowCount === 0) {
        return res.status(400).json({
          msg: `Pas de creneau trouvé avec cet id : ${req.params.idC}`
        })
      }
      return res.status(200).json({
        msg: `Get creneau : ${req.params.idC}`,
        data: await addCreatorAndRefactorCreneau(events.rows)
        
      })
    })
    .catch((error) => {
      const message = 'Le créneau n\'a pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}