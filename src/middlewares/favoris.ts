import { Request, Response } from "express";

/**
 * Cette fonction me permet de vérifier que le body de la requete récupérer est correct
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function checkBodyCreateFavoris(req: Request, res: Response, next: any) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object ) {
        return res.status(400).send({ msg : "Votre body est vide"})
      } else {
        if (req.body.idEvent === undefined || req.body.idUser === undefined) {
          return res.status(400).send({ msg : "Veuillez à fournir le idEvent, idUser dans votre body"});
        } else if (req.body.idEvent === "" || req.body.idUser === "" ) {
          return res.status(400).send({ msg : "Un des champs fourni est vide"});
        }
      }
      next();
}