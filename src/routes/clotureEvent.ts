import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt"; 


export function closeEvent (app : any) {
  app.patch('/events/:idE', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser(
      'UPDATE data.events SET cloture = true WHERE idevent = $1', 
      [req.params.idE]
    )
    .then(() => {
      return res.status(200).json({
        msg: `Event cloturer : ${req.params.idE}`
      })
    })
    .catch((error) => {
      const message = 'event n\' a pas pu etre rajouter'
      res.status(500).json({message, data : error});
    })
  })
}