import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateEvent } from "../middlewares/event";  


export function createEvent (app : any) {
  app.post('/api/events', verifyToken, checkBodyCreateEvent, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('INSERT INTO data.events (name, description, cloture, idcreator) VALUES ($1, $2, $3, $4)', 
    [req.body.name, req.body.description, req.body.cloture, req.body.idcreator]
    )
    .then(() => {
      return res.status(200).json({
        msg: "Event created",
        data: {
          "name": req.body.name,
          "description": req.body.description,
          "cloture": req.body.cloture,
          "creator": req.body.idcreator
        }
      })
    })
    .catch((error) => {
      const message = 'event n\' a pas pu etre rajouter'
      res.status(500).json({message, data : error});
    })
  })
}