import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const db = require('../db/postgre');

export async function signup(req: Request, res : Response) {
    console.log(req.body.username, req.body.lastname, req.body.firstname, req.body.password);
    try {
        db.querywithparameters("INSERT INTO data.users (username, lastname, firstname, password) VALUES ($1, $2, $3, $4);",
        [req.body.username, req.body.lastname, req.body.firstname, bcrypt.hashSync(req.body.password, 8)],
        (err : string, result: any) => {
            if (err) {
              return err
            }
            res.status(200).send({
                msg: `L'utilisateur ${req.body.username} a bien été ajouté`
            })
        });
    } catch (error) {
        console.log(error);
    }
    
}