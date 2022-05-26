import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";

export function getUserByIdCreneau (app : any) {
  app.get('/api/users/creneau/:idC', verifyToken, (req : Request, res: Response, next : any ) => {
    console.log(req.params.idC)
    querywithparametersUser('select u.iduser, u.username, u.lastname, u.firstname, c.idcreneau from data.users u, data.creneau c, data.reponses r where c.idcreneau = $1 and r.iduser = u.iduser and c.idcreneau = r.idcreneau;', [req.params.idC])
    .then((events) => {
      if (events.rowCount === 0) {
        return res.status(400).json({
          msg: `Pas utilisateurs trouvé avec cet id : ${req.params.idC}`
        })
      }
      return res.status(200).json({
        msg: `Get Users : ${req.params.idC}`,
        data: events.rows
        
      })
    })
    .catch((error) => {
      console.log(error)
      const message = 'Le user n\'a pas pu être récupérer'
      res.status(500).json({message, data : error});
    })
  })
}