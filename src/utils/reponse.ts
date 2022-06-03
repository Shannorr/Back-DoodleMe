import { querywithparametersUser } from "../db/postgre"

export async function getReponseByiduserandidcreneau (iduser : string, idcreaneau: string) : Promise<any>{
  const str = 'select * from data.reponses where idcreneau = $1 and iduser = $2;';
  const res = await querywithparametersUser(str, [idcreaneau, iduser]);
  return res.rows[0];
}

// ajoute ou enlève une réponse
export async function ajouterUneReponsePositive (idcreaneau: string) : Promise<void>{
  const res = await querywithparametersUser("update data.creneau set nbreppositive = nbreppositive +1 where idcreneau = $1;", [idcreaneau]);
  return res.rows[0];
}

export async function enleverUneReponsePositive (idcreaneau: string) : Promise<void>{
  const res = await querywithparametersUser("update data.creneau set nbreppositive = nbreppositive -1 where idcreneau = $1;", [idcreaneau]);
  return res.rows[0];
}

// effectue une update de la réponse dans la bd
export async function updateReponse (iduser : string, idcreaneau: string, reponse: string) : Promise<void>{
  const res = await querywithparametersUser("update data.reponses set reponse = $1 where idcreneau = $2 and iduser = $3;", [reponse, idcreaneau, iduser]);
  return res.rows[0];
}