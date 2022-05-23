import { Request, Response } from "express";
import { querywithparameters } from "../db/postgre";
import { IPersonne } from "../models/personne";

export async function checkDuplicateUsernameOrEmail (req: Request, res: Response, next: any) {
    const t = await querywithparameters("Select * from data.users where username = $1",
    [req.body.username],
    (err : string, result : any) => {
        if (err) {
            
          return next(err)
        }
        console.log(result.rows)
        return result.rows[0]
    });
    console.log(t);
    // console.log(verifUsername)
    // if (verifUsername) {
    //     res.status(400).send({
    //         message : "Failed! Username already in use!"
    //     })
    //     return null;
    // }
    console.log("verif username good : ", req.body.username)
    next();
}

