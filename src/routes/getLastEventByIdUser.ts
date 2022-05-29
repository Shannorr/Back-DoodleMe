import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { addCreator, addCreatorAndRefactor } from "../utils/users";


export function getLastEventByIdUser (app : any) {
  app.get('/api/events/last/:idU', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('select distinct e.* from data.events e where idcreator = $1 and idevent = (Select Max(idevent) from data.events e2 where e2.idcreator = e.idcreator )', [req.params.idU])
    .then(async (events) => {
      if (events.rowCount === 0) {
        return res.status(400).json({
          msg: `Pas d'event trouvé avec cet id : ${req.params.idU}`
        })
      }
      return res.status(200).json({
        msg: `Get Event : ${req.params.idU}`,
        data: await addCreatorAndRefactor(events.rows)
        
      })
    })
    .catch((error) => {
      const message = 'Les events n\'ont pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}