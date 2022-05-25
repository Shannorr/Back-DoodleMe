import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";


export function getEventById (app : any) {
  app.get('/events/:idE', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('SELECT * FROM data.events where idEvent = $1', [req.params.idE])
    .then((events) => {
      if (events.rowCount === 0) {
        return res.status(400).json({
          msg: `Pas d'event trouvé avec cet id : ${req.params.idE}`
        })
      }
      return res.status(200).json({
        msg: `Get Event : ${req.params.idE}`,
        data: events.rows
        
      })
    })
    .catch((error) => {
      const message = 'Les events n\'ont pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}