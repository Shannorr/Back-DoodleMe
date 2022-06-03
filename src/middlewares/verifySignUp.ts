import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";


/**
 * Me permet de vérifier si le nom d'utilisateur est déjà présent dans la bd
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export async function checkDuplicateUsername (req: Request, res: Response, next: any) {
  const t = await querywithparametersUser("Select * from data.users where username = $1", [req.body.username]);
  if (t.rows[0]) {
    return res.status(400).send("Votre nom d'utilisateur est déjà utilisé.");
  } else {
    next();
  }
}

/**
 * Permet de vérifier les paramètres du body
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function checkBody(req: Request, res: Response, next: any) {
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object ) {
    return res.status(400).send({ msg : "Votre body est vide"})
  } else {
    if (req.body.username === undefined || req.body.lastname === undefined || req.body.firstname === undefined || req.body.password === undefined) {
      return res.status(400).send({ msg : "Veuillez à fournir le username, lastname, firstname et password dans votre body"});
    } else if (req.body.username === "" || req.body.lastname === "" || req.body.firstname === "" || req.body.password === "") {
      return res.status(400).send({ msg : "Un des champs fourni est vide"});
    }
  }
  next();
}

