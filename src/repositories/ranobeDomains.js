class RanobeDomainsRepo {
  constructor(db) {
    this.db = db;
  }

  async create({ ranobesInfoId, domain, url }) {
    const insertQuery =
      'INSERT INTO ranobes (ranobesInfoId, domain, source) \
    VALUES ($1, $2, $3) RETURNING *';
    const values = [ranobesInfoId, domain, url];
    const { rows } = await this.db.query(insertQuery, values);
    return rows[0];
  }

  async getOneByDomain({ ranobesInfoId, domain }) {
    const selectQuery =
      'SELECT * FROM ranobes WHERE ranobesInfoId=$1 AND domain=$2';
    const values = [ranobesInfoId, domain];
    console.log(values);
    const { rows } = await this.query(selectQuery, values);
    console.log(rows);
    return rows[0];
  }
}

export default RanobeDomainsRepo;
