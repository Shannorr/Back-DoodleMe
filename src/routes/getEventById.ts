import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { addCreator, addCreatorAndRefactor } from "../utils/users";


/**
 * Route me permettant de récupérer un event pas son id
 * @param app 
 */
export function getEventById (app : any) {
  app.get('/api/events/:idE', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('SELECT * FROM data.events where idEvent = $1', [req.params.idE])
    .then(async (events) => {
      if (events.rowCount === 0) {
        return res.status(400).json({
          msg: `Pas d'event trouvé avec cet id : ${req.params.idE}`
        })
      }
      return res.status(200).json({
        msg: `Get Event : ${req.params.idE}`,
        data: await addCreatorAndRefactor(events.rows)
        
      })
    })
    .catch((error) => {
      const message = 'Les events n\'ont pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}