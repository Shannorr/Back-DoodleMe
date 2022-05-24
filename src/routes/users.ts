// notice here I'm requiring my database adapter file

import { Request, Response } from "express"
import { querywithoutparametersUser } from "../db/postgre"


export function getAllUsers (app : any) {
  app.get('/users', (req : Request, res: Response, next : any ) => {
    querywithoutparametersUser('SELECT * FROM data.users')
    .then((users) => {
      res.status(200).json({
        msg: "Get all users",
        data: users.rows
      })
    })
    .catch((err) => {
      console.log(err);
    })
  })
}

