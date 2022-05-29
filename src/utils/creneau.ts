
// notice here I'm requiring my database adapter file
import { querywithparametersUser } from "../db/postgre"
import { getUserbyId } from "./users";

export async function addCreatorAndRefactorCreneau (rows : any[]) {
    // console.log(rows)
    const returnrep : any[] = [];
    for (let i = 0; i < rows.length; i++) {
        const eventContent : any = await getEventById(rows[i].idevent);
        const resp : any = await getUserbyId(eventContent.idcreator);
        // console.log(eventContent)
        const rep : any = {
            evenement : {
                id : eventContent.idevent,
                nom : eventContent.name,
                description : eventContent.description ,
                cloture: eventContent.cloture,
                createur : {
                    iduser: resp.iduser,
                    username: resp.username,
                    lastname: resp.lastname,
                    firstname: resp.firstname
                }
            },
            id: rows[i].idcreneau,
            date: rows[i].date,
            heureDebut: rows[i].heuredebut,
            nbRepPositive: rows[i].nbreppositive
        }
        returnrep.push(rep);
    }
    // console.log(returnrep);
    return returnrep;
}

async function getEventById (id : string) : Promise<void>{
const res = await querywithparametersUser('SELECT * FROM data.events WHERE idevent = $1', [id]);
return res.rows[0];
}