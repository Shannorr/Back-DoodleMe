import { querywithparametersUser } from "../db/postgre"
import { ICreneau } from "../models/creneau";
import { IEvenement } from "../models/event";
import { getUserById } from "../routes/getUserById";
import { getEventById } from "./event";

export async function getIdCreneauBy (iduser : string, idevent: string) : Promise<any>{
  const str = 'select * from data.favoris';
  const res = await querywithparametersUser(str, [idevent, iduser]);
  return res.rows[0];
}

export async function addCreatorAndRefactorCreneau (rows : any[]) {

  const returnrep : ICreneau[] = [];  

  for (let i = 0; i < rows.length; i++) {
    const events : IEvenement = await getEventById(rows[i].idevent);
    // console.log(events)
    const rep : ICreneau =  {
      evenement: events,
      id: rows[i].idcreneau,
      date: rows[i].date,
      heureDebut: rows[i].heuredebut,
      nbRepPositive: rows[i].nbreppositive
    };
    returnrep.push(rep);
  };
  return returnrep;
}