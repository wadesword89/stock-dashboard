import pg from 'pg';

const PG_URI = 'postgres://cglufeah:veoFSd9ODQBExj7gWZn4l96FE31XhDog@bubble.db.elephantsql.com/cglufeah';

// Create a new pool here using the connection string above
const pool = new pg.Pool({
  connectionString: PG_URI,
});

export default {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};