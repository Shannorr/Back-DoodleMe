import { querywithparametersUser } from "../db/postgre"

export async function getFavoris (iduser : string, idevent: string) : Promise<any>{
  const str = 'select * from data.favoris where idevent = $1 and iduser = $2;';
  const res = await querywithparametersUser(str, [idevent, iduser]);
  return res.rows[0];
}