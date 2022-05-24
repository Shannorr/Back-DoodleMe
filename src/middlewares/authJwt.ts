import { Request, Response } from "express";
import config from "../configs/auht.config.json"
const jwt = require("jsonwebtoken");

export function verifyToken (req: any, res: Response, next: any) {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, config.secret, (err: string, decoded: {id: string}) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
  };