import { querywithparametersUser } from "../db/postgre";

export interface IPersonne {
  iduser: number;
  username: string;
  lastname: string;
  firstname: string;
  password: string;
}

export async function getUserByUserName (username: string) : Promise<IPersonne> {
  return querywithparametersUser("SELECT * FROM data.users where username = $1", [username]).then((result) => result.rows[0]);
}