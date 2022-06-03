import { querywithparametersUser } from "../db/postgre";

// Interface pour les personne
export interface IPersonne {
  iduser: number;
  username: string;
  lastname: string;
  firstname: string;
}

// Me permet de récupérer les infomations utilisateurs dans la bd à partir du username
export async function getUserByUserName (username: string) : Promise<any> {
  return querywithparametersUser("SELECT * FROM data.users where username = $1", [username]).then((result) => result.rows[0]);
}