// notice here I'm requiring my database adapter file
import { querywithparametersUser } from "../db/postgre"
import { IPersonne } from "../models/personne";


export async function getUserbyId (id : string) : Promise<void>{
  const res = await querywithparametersUser('SELECT * FROM data.users WHERE id = $1', [id]);
  return res.rows[0];
}

