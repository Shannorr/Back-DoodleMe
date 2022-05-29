// notice here I'm requiring my database adapter file
import { querywithparametersUser } from "../db/postgre"
import { IEvenement } from "../models/event";
import { IEvenementFavori } from "../models/favorisEvent";


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


export async function addCreatorAndRefactor (rows : any[]) {
  const returnrep : IEvenement[] = [];
  for (let i = 0; i < rows.length; i++) {
    const resp : any = await getUserbyId(rows[i].idcreator)
    const rep : IEvenement = {
      id : rows[i].idevent,
      nom : rows[i].name,
      description : rows[i].description ,
      cloture: rows[i].cloture,
      createur : {
        iduser: resp.iduser,
        username: resp.username,
        lastname: resp.lastname,
        firstname: resp.firstname
      }
    }
    returnrep.push(rep);
  }
  
  return returnrep;
}


export async function addCreatorAndRefactorReponse (rows : any[]) {
  const returnrep : IEvenement[] = [];
  for (let i = 0; i < rows.length; i++) {
    const resp : any = await getUserbyId(rows[i].idcreator)
    const rep : any = {
      creneau :  {
        evenement: {
          id: rows[i].idevent,
          nom: rows[i].name,
          description: rows[i].description,
          cloture: rows[i].cloture,
          createur: {
            iduser: resp.iduser,
            username: resp.username,
            lastname: resp.lastname,
            firstname: resp.firstname
          }
        }, //copie de l'objet comme ça accès à toutes les données de l'event (pas juste l'id de l'event)
        id: rows[i].idcreneau,
        date: rows[i].date,
        heureDebut: rows[i].heuredebut,
        nbRepPositive: rows[i].nbreppositive,
      },
      reponse : rows[i].reponse
    };
    returnrep.push(rep);
  }
  // console.log(returnrep);
  return returnrep;
}