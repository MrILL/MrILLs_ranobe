import db from '../db';

const create = async ({ title, url }) => {
  return await db.query(
    'INSERT INTO ranobes (title, source) VALUES ($1, $2) RETURNING *',
    [title, url]
  );
};

const getOneByUrl = async (url) => {
  return await db.query(`SELECT * FROM ranobes WHERE source=$1`, [url]);
};

const updateChapters = async ({ ranobeID, chapterFirstID, chapterLastID }) => {
  return await db.query(
    'UPDATE ranobes SET chapter_first=$1, chapter_last=$2 WHERE id=$3 RETURNING *',
    [chapterFirstID, chapterLastID, ranobeID]
  );
};

export default {
  create,
  getOneByUrl,
  updateChapters,
};
