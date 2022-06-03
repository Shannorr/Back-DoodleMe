import { querywithparametersUser } from "../db/postgre";
import { IEvenement } from "../models/event";
import { getUserbyId } from "./users";

/**
 * récupère l'event par son id dans las bd
 * @param idevent 
 * @returns 
 */

export async function getEventById (idevent: string) : Promise<IEvenement>{
  const str = 'select * from data.events where idevent = $1';
  const res = await querywithparametersUser(str, [idevent]);

  const user : any = await getUserbyId(res.rows[0].idcreator);
  // console.log(user)
  return {
    id: res.rows[0].idevent,
    nom: res.rows[0].name,
    description: res.rows[0].description,
    cloture: res.rows[0].cloture,
    createur: {
      iduser: user.iduser,
      username: user.username,
      lastname: user.lastname,
      firstname: user.firstname,
    }
  };
}

/**
 * je récupère un évènement à partir de son nom dans la bd
 * @param name 
 * @returns 
 */
export async function getEventIdByName (name: string) : Promise<any>{
  const str = 'select * from data.events where name = $1';
  const res = await querywithparametersUser(str, [name]);

  // console.log(res);
  return res.rows[0];
}