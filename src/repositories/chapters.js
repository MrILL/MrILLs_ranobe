class ChaptersRepo {
  constructor(db) {
    this.db = db;
  }

  async create({ id, title, body }) {
    return await db.query(
      'INSERT INTO chapters (ranobeId, title, body) \
        VALUES ($1, $2, $3) RETURNING *',
      [id, title, body]
    );
  }
}

export default ChaptersRepo;
