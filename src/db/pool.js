import fs from 'fs';
import pg from 'pg';

//TODO write
export const db = new pg.Pool();

export const init = (initFileUrl) => {
  const script = fs.readFileSync(initFileUrl).toString();
  db.query(script);
};
