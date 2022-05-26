import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { IEvenementFavori } from "../models/favorisEvent";
import { addCreator, addCreatorAndRefactor } from "../utils/users";

export function getFavorisEventByIdUser (app : any) {
  app.get('/api/favoris/event/:idU', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('select u.iduser, e.idevent, e.name, e.description, e.cloture, e.idcreator from data.users u, data.events e, data.favoris f where u.iduser = $1 and f.iduser = u.iduser and e.idevent = f.idevent;', [req.params.idU])
    .then(async (events) => {
      if (events.rowCount === 0) {
        return res.status(400).json({
          msg: `Pas d'user trouvé avec cet id : ${req.params.idU}`
        })
      }
      return res.status(200).json({
        msg: `Get User : ${req.params.idU}`,
        data: await addCreatorAndRefactor(events.rows)
        
      })
    })
    .catch((error) => {
      const message = 'Le user n\'a pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}

