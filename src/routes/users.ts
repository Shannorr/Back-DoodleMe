// notice here I'm requiring my database adapter file

import { Request, Response } from "express"

// and not requiring node-postgres directly
const db = require('../db/postgre')

module.exports = (app : any) => {
  app.get('/users', (req : Request, res: Response, next : any ) => {
    db.query('SELECT * FROM data.users', '', (err : string, result : any) => {
      if (err) {
        return next(err)
      }
      res.status(200).send(result.rows)
    })
})
}

