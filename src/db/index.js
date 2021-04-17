import fs from 'fs';
import pg from 'pg';

const pool = new pg.Pool();

const query = (queryCfg, values) => pool.query(queryCfg, values);

const init = (initFileUrl) => {
  const script = fs.readFileSync(initFileUrl).toString();
  query(script);
};

export default { query, init };
