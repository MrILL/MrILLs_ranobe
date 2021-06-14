export class ChaptersRepo {
  constructor(db) {
    this.db = db;
  }

  async create({ id, ranobeDomainId, title, body, nomer, source }) {
    const insertQuery =
      'INSERT INTO chapters (id, ranobeDomainId, title, body, nomer, source) \
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    const values = [id, ranobeDomainId, title, body, nomer, source];
    const { rows } = await this.db.query(insertQuery, values);

    return rows[0];
  }

  //TODO: pagination
  async get({ ranobeDomainId }) {
    const selectQuery = 'SELECT * FROM chapters WHERE ranobeDomainId=$1';
    const values = [ranobeDomainId];
    const { rows } = await this.db.query(selectQuery, values);

    return rows;
  }

  async getOne({ ranobeDomainId, nomer }) {
    const selectQuery =
      'SELECT * FROM chapters WHERE ranobeDomainId=$1 AND nomer=$2';
    const values = [ranobeDomainId, nomer];
    const { rows } = await this.db.query(selectQuery, values);

    return rows[0];
  }

  async update({ chapterId, title, body, source }) {
    const updateQuery =
      'UPDATE chapters \
      SET title=$2, body=$3, source=$4 \
      WHERE id=$1 RETURNING *';
    const values = [chapterId, title, body, source];
    const { rows } = await this.db.query(updateQuery, values);

    return rows[0];
  }

  async delete({ chapterId }) {
    const deleteQuery = 'DELETE FROM chapters WHERE id=$1';
    const values = [chapterId];
    const { rowCount } = await this.db.query(deleteQuery, values);

    return rowCount === 1;
  }
}
