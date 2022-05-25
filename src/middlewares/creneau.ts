import { Request, Response } from "express";

export function checkBodyCreateCreneau(req: Request, res: Response, next: any) {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object ) {
        return res.status(400).send({ msg : "Votre body est vide"})
      } else {
        if (req.body.date === undefined || req.body.heureDebut === undefined || req.body.idEvent === undefined) {
          return res.status(400).send({ msg : "Veuillez à fournir le date, heureDebut et idEvent dans votre body"});
        } else if (req.body.date === "" || req.body.heureDebut === "" || req.body.idEvent === "") {
          return res.status(400).send({ msg : "Un des champs fourni est vide"});
        }
      }
      next();
}