import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const PG_URI = process.env.PG_URI;

const pool = new pg.Pool({
  connectionString: PG_URI,
});

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};