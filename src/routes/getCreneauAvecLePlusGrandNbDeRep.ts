import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { addCreatorAndRefactor } from "../utils/users";


export function getCreneauWithHighestResponse (app : any) {
  app.get('/api/creneau/winner/:idE', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('select e.* from data.creneau e where e.idevent = $1 AND e.nbreppositive = (SELECT MAX(nbreppositive) FROM data.creneau where idevent = e.idevent);', [req.params.idE])
    .then(async (events) => {
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
      console.log(error)
      res.status(500).json({message, data : error});
    })
  })
}