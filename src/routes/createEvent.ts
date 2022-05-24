import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { getUserbyId } from "./users";


export function createEvent (app : any) {
  app.post('/events', verifyToken, (req : Request, res: Response, next : any ) => {
    console.log("hey")
    querywithparametersUser('INSERT INTO (name, description, cloture, creator) data.events VALUES ($1, $2, $3, $4)', 
    [req.body.name, req.body.description, req.body.cloture, req.body.creator]
    )
    .then((users) => {
      return res.status(200).json({
        msg: "Event created",
        data: {
          "name": req.body.name,
          "description": req.body.description,
          "cloture": req.body.cloture,
          "creator": getUserbyId(req.body.id)
        }
      })
    })
    .catch((error) => {
      const message = 'event n\' a pas pu etre rajouter'
      res.status(500).json({message, data : error});
    })
  })
}