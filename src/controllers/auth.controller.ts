import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { querywithparametersUser } from "../db/postgre";
import { getUserByUserName } from "../models/personne";
import * as config from "../configs/auth.config.json";

export async function signup(req: Request, res : Response) {
    try {
        querywithparametersUser("INSERT INTO data.users (username, lastname, firstname, password) VALUES ($1, $2, $3, $4);",
        [req.body.username, req.body.lastname, req.body.firstname, bcrypt.hashSync(req.body.password, 8)]);
        return res.status(201).json({msg : 'Utilsateur créer avec succès!', data: req.body});
    } catch (error) {
        console.log(error);
    }
    
}


export async function signin(req: Request, res : Response) {
    if (req.body.username === undefined || req.body.password === undefined) {
        return res.status(400).send({msg : "Le username ou le password est absent"})
    } else if (req.body.username === "" || req.body.password === "") {
        return res.status(400).send({msg : "Le username ou le password est vide"})
    } else {
        getUserByUserName(req.body.username)
        .then((user)=> {
            if (!user) {
                return res.status(404).send({msg : "Pas d'utilisateur trouvé"})
            } 

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.iduser }, config.secret, {
                expiresIn: 15000 
                });
            
            return res.status(200).send({
                id: user.iduser,
                username: user.username,
                lastname: user.lastname,
                firstname: user.firstname,
                accessToken: token
                });

        })
        .catch((err) => console.log(err));
    }
}