class ChaptersRepo {
  constructor(db) {
    this.db = db;
  }

  async create({ ranobeDomainId, title, body }) {
    return await db.query(
      'INSERT INTO chapters (ranobeDomainId, title, body) \
        VALUES ($1, $2, $3) RETURNING *',
      [ranobeDomainId, title, body]
    );
  }
}

export default ChaptersRepo;
