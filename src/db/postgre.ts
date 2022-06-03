import config from  '../configs/db.config.json';
import { Pool } from 'pg';
import { IPersonne } from '../models/personne';

// Ce fichier me permet d'instancier ma connexion à la bd et de 
// facilement executer mes requetes vers la bd 


const pool : any = new Pool({
  user: config.USER,
  host: config.HOST,
  database: config.DB,
  password: config.PASSWORD,
  port: config.port,
})

export function querywithparametersUser (text: string, params: string[]) : Promise<any> {
  return pool.query(text, params)
}

export function querywithoutparametersUser (text: string) : Promise<any>{
  return pool.query(text);
}

