class RanobesRepo {
  constructor(db) {
    this.db = db;
  }

  async create({ title }) {
    const insertQuery = 'INSERT INTO ranobes (title) VALUES ($1) RETURNING *';
    const values = [title];
    const { rows } = await this.db.query(insertQuery, values);
    return rows[0];
  }

  //TODO add pagination
  async get() {
    const selectQuery = 'SELECT * FROM ranobes';
    const { rows } = await this.db.query(selectQuery);
    return rows;
  }

  async getOneById({ id }) {
    const selectQuery = 'SELECT * FROM ranobes WHERE id=$1';
    const values = [id];
    const { rows } = await this.db.query(selectQuery, values);
    return rows[0];
  }

  async update({ ranobeId, title }) {
    const updateQuery = 'UPDATE ranobes SET title=$2 WHERE id=$1 RETURNING *';
    const values = [ranobeId, title];
    const { rows } = await this.db.query(updateQuery, values);
    return rows[0];
  }
}

export default RanobesRepo;
