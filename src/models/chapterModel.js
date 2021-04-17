import db from '../db';

const create = async ({ id, title, body }) => {
  return await db.query(
    'INSERT INTO chapters (ranobeId, title, body) VALUES ($1, $2, $3) RETURNING *',
    [id, title, body]
  );
};

export default {
  create,
};
