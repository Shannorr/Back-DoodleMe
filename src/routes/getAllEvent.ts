import { Request, Response } from "express";
import { querywithoutparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { addCreator, addCreatorAndRefactor } from "../utils/users";

/**
 * Route me permettant de récupérer tout les évents
 * 
 * @param app 
 */
export function getAllEvent (app : any) {
  app.get('/api/events', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithoutparametersUser('SELECT * FROM data.events')
    .then(async (events) => {
      return res.status(200).json({
        msg: "get Event",
        data: await addCreatorAndRefactor(events.rows)
        
      })
    })
    .catch((error) => {
      const message = 'Les events n\'ont pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}