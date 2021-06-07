export class RanobeDomainsRepo {
  constructor(db) {
    this.db = db;
  }

  async create({ ranobeId, domain, url }) {
    const insertQuery =
      'INSERT INTO ranobeDomains (ranobeId, domain, source) \
      VALUES ($1, $2, $3) RETURNING *';
    const values = [ranobeId, domain, url];
    const { rows } = await this.db.query(insertQuery, values);

    return rows[0];
  }

  async get({ ranobeId }) {
    const selectQuery = 'SELECT * FROM ranobeDomains WHERE ranobeId=$1';
    const values = [ranobeId];
    const { rows } = await this.db.query(selectQuery, values);
    return rows;
  }

  async getOne({ ranobeId, domain }) {
    const selectQuery =
      'SELECT * FROM ranobeDomains WHERE ranobeId=$1 AND domain=$2';
    const values = [ranobeId, domain];
    const { rows } = await this.db.query(selectQuery, values);

    return rows[0];
  }

  async update({ ranobeId, domain, url }) {
    const updateQuery =
      'UPDATE ranobeDomains \
      SET source=$3 \
      WHERE ranobeId=$1 AND domain=$2 \
      RETURNING *';
    const values = [ranobeId, domain, url];
    const { rows } = await this.db.query(updateQuery, values);

    return rows[0];
  }

  async delete({ ranobeId, domain }) {
    const deleteQuery =
      'DELETE FROM ranobeDomains WHERE ranobeId=$1 AND domain=$2';
    const values = [ranobeId, domain];
    await this.db.query(deleteQuery, values);
  }
}
