import { Request, Response } from "express";
import { querywithoutparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";

export function getAllEvent (app : any) {
  app.get('/events', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithoutparametersUser('SELECT * FROM data.events')
    .then((events) => {
      return res.status(200).json({
        msg: "Event created",
        data: events.rows
        
      })
    })
    .catch((error) => {
      const message = 'Les events n\'ont pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}