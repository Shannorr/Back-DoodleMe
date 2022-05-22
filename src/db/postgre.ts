import config from  '../configs/db.config.json';
import { Pool } from 'pg';

const pool : any = new Pool({
  user: config.USER,
  host: config.HOST,
  database: config.DB,
  password: config.PASSWORD,
  port: config.port,
})

module.exports = {
  querywithparameters: (text: string, params: string, callback : void) => {
    return pool.query(text, params, callback)
  },
  querywithoutparameters: (text: string, callback : void) => {
    return pool.query(text, callback)
  }

}