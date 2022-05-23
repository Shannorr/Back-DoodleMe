import config from  '../configs/db.config.json';
import { Pool } from 'pg';

const pool : any = new Pool({
  user: config.USER,
  host: config.HOST,
  database: config.DB,
  password: config.PASSWORD,
  port: config.port,
})

export function querywithparameters (text: string, params: string[], callback : any) {
  return pool.query(text, params, callback)
}

export function querywithoutparameters (text: string, callback : any) {
  return pool.query(text, callback);
}

