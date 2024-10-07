import dotenv from 'dotenv'
import pg from 'pg'


dotenv.config({path: './server/.env'})

const config = {
  connectionString: process.env.PG_CONNECTION_STRING,
}

export const pool = new pg.Pool(config)