import { Request, Response } from "express";
import { signup } from "../controllers/auth.controller";
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignUp";


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
    checkDuplicateUsernameOrEmail,
    signup
  );
  // app.post("/api/auth/signin", signin);
};