import fs from 'fs';
import pg from 'pg';

//TODO write
const db = new pg.Pool();

const init = (initFileUrl) => {
  const script = fs.readFileSync(initFileUrl).toString();
  db.query(script);
};

export default { db, init };
