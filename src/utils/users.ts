// notice here I'm requiring my database adapter file
import { querywithparametersUser } from "../db/postgre"
import { IEvenementFavori } from "../models/favorisEvent";
import { IPersonne } from "../models/personne";


async function getUserbyId (id : string) : Promise<void>{
  const res = await querywithparametersUser('SELECT iduser, username, lastname, firstname FROM data.users WHERE idUser = $1', [id]);
  return res.rows[0];
}

export async function addCreator (rows : IEvenementFavori[]) {
  for (let i = 0; i < rows.length; i++) {
    console.log(rows[i].idcreator);
    const resp = await getUserbyId(rows[i].idcreator)
    rows[i].idcreator = resp;
  }
  console.log(rows)
  return rows;
}

