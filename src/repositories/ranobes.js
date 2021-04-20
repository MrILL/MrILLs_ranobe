class RanobesRepo {
  constructor(db) {
    this.db = db;
  }

  async create({ title }) {
    const insertQuery =
      'INSERT INTO ranobesInfo (title) VALUES ($1) RETURNING *';
    const values = [title];
    const { rows } = await db.query(insertQuery, values);
    return rows[0];
  }

  async getOneById({ id }) {
    const selectQuery = 'SELECT * FROM ranobesInfo WHERE id=$1';
    const values = [id];
    const { rows } = await db.query(selectQuery, values);
    return rows[0];
  }
}

export default RanobesRepo;
