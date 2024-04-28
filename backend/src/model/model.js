import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const PG_URI = process.env.PG_URI;

const pool = new pg.Pool({
  connectionString: PG_URI,
});

const checkConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connection successful:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  checkConnection,
};