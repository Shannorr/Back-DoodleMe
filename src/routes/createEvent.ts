import { Request, Response } from "express";
import { querywithparametersUser } from "../db/postgre";
import { verifyToken } from "../middlewares/authJwt";
import { checkBodyCreateEvent } from "../middlewares/event";  
import { getEventIdByName } from "../utils/event";


export function createEvent (app : any) {
  app.post('/api/events', verifyToken, checkBodyCreateEvent, async (req : Request, res: Response, next : any ) => {
    

    
    if (await getEventIdByName(req.body.name)) {
      res.status(401).send({msg : "Nom déjà utilisé"})
    } else {
      console.log("ajout");
      querywithparametersUser('INSERT INTO data.events (name, description, cloture, idcreator) VALUES ($1, $2, $3, $4)', 
      [req.body.name, req.body.description, req.body.cloture, req.body.idcreator]
      )
      .then(async () => {
        const creneauTab : IcreneauTab[] = req.body.creneauTab;
        // console.log(creneauTab.length);
  
  
        const event = await getEventIdByName(req.body.name);
        console.log(event);
  
  
        for (let i = 0; i<creneauTab.length; i++) {
          createCreneau(creneauTab[i].date, creneauTab[i].heureDebut, event.idevent)
        }
  
  
        return res.status(200).json({
          msg: "Event created",
          data: {
            "name": req.body.name,
            "description": req.body.description,
            "cloture": req.body.cloture,
            "creator": req.body.idcreator
          }
        })
      })
      .catch((error) => {
        const message = 'event n\' a pas pu etre rajouter'
        res.status(500).json({message, data : error});
      })
    }

  })
}

interface IcreneauTab {
  date : string,
  heureDebut : string
}

async function createCreneau (date: string, heureDebut: string, idevent: string) : Promise<void> {
  await querywithparametersUser('INSERT INTO data.creneau (date, heureDebut, nbRepPositive, idEvent) VALUES ($1, $2, 0, $3)', 
      [date, heureDebut, idevent])
}