import { Request, Response } from "express";
import * as config from "../configs/auth.config.json"
const jwt = require("jsonwebtoken");

export function verifyToken (req: any, res: Response, next: any) {
  let authorizationHeader  = req.headers.authorization;

  if (!authorizationHeader ) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }

  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, config.secret, (error : string, decodedToken : any) => {
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()
    }
  });
};