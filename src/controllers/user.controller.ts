import { Request, Response } from "express";

export function allAccess (req : Request, res: Response) {
  return res.status(200).send("Public Content.");
};

export function userBoard (req: Request, res: Response) {
  res.status(200).send("User Content.");
};