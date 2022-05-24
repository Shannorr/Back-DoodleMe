// notice here I'm requiring my database adapter file
import { querywithparametersUser } from "../db/postgre"


export function getUserbyId (id : string) {
  querywithparametersUser('SELECT * FROM data.users WHERE id = $1', [id])
  .then((users) => {
    return {
      msg: "Get all users",
      data: users.rows
    };
  })
  .catch((err) => {
    console.log(err);
  })
  
}

