import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { addCreator, addCreatorAndRefactor } from "../utils/users";


export function getEventOuUserARepondu (app : any) {
  app.get('/api/users/reponse/:idU', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('select distinct e.* from data.users u, data.creneau c, data.reponses r, data.events e where u.iduser = $1 AND u.iduser = r.iduser AND r.idcreneau = c.idcreneau AND c.idevent = e.idevent;', [req.params.idU])
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