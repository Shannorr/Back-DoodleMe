import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";

export function getUserById (app : any) {
  app.get('/api/users/:idU', verifyToken, (req : Request, res: Response, next : any ) => {
    querywithparametersUser('SELECT * FROM data.users where idUser = $1', [req.params.idU])
    .then((events) => {
      if (events.rowCount === 0) {
        return res.status(400).json({
          msg: `Pas d'user trouvé avec cet id : ${req.params.idU}`
        })
      }
      return res.status(200).json({
        msg: `Get User : ${req.params.idU}`,
        data: events.rows
        
      })
    })
    .catch((error) => {
      const message = 'Le user n\'a pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}