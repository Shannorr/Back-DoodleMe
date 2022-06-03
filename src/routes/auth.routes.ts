import { Request, Response } from "express";
import { signin, signup } from "../controllers/auth.controller";
import { checkBody, checkDuplicateUsername } from "../middlewares/verifySignUp";
import { verifyToken } from "../middlewares/authJwt";
import * as controller from "../controllers/user.controller"

/**
 * Me permet de définir 3 routes : 1 de test, 1 pour la connexion et 1 pour l'inscription
 * @param app 
 */
export function routesLogin (app : any) {
  app.use(function(req: Request, res: Response, next: any) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    checkBody,
    checkDuplicateUsername,
    signup
  );
  app.post("/api/auth/signin",
    signin
  );
  app.get(
    "/api/test/user",
    verifyToken,
    controller.userBoard
  );
};