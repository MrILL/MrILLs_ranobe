import { Injectable } from '@nestjs/common'
import { DbService } from 'src/db'
import { Chapter } from './entities'

@Injectable()
export class ChaptersRepository {
  constructor(private readonly db: DbService) {}

  async create(
    id: string,
    ranobeDomainId: string,
    { source, title, body, nomer }: Chapter
  ): Promise<Partial<Chapter>> {
    const insertQuery =
      'INSERT INTO chapters (id, ranobeDomainId, title, body, nomer, source) \
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING nomer'
    const values = [id, ranobeDomainId, title, body, nomer, source]
    const { rows } = await this.db.query(insertQuery, values)

    return rows[0]
  }

  //TODO: pagination
  async findAll(ranobeDomainId: string): Promise<Chapter[]> {
    const selectQuery = 'SELECT * FROM chapters WHERE ranobeDomainId=$1'
    const values = [ranobeDomainId]
    const { rows } = await this.db.query(selectQuery, values)

    return rows
  }

  async findOne(ranobeDomainId: string, nomer: number): Promise<Chapter> {
    const selectQuery =
      'SELECT * FROM chapters WHERE ranobeDomainId=$1 AND nomer=$2'
    const values = [ranobeDomainId, nomer]
    const { rows } = await this.db.query(selectQuery, values)

    return rows[0]
  }

  async update(chapterId: string, { title, body, source }): Promise<Chapter> {
    const updateQuery =
      'UPDATE chapters \
      SET title=$2, body=$3, source=$4 \
      WHERE id=$1 RETURNING *'
    const values = [chapterId, title, body, source]
    const { rows } = await this.db.query(updateQuery, values)

    return rows[0]
  }

  async remove(chapterId: string): Promise<boolean> {
    const deleteQuery = 'DELETE FROM chapters WHERE id=$1'
    const values = [chapterId]
    const { rowCount } = await this.db.query(deleteQuery, values)

    return rowCount === 1
  }
}
