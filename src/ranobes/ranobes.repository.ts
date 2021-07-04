import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db';
import { Ranobe } from './entities';
import { CreateRanobeDto, UpdateRanobeDto } from './dto';

@Injectable()
export class RanobesRepository {
  constructor(private readonly db: DbService) {}

  async create(
    id: string,
    { title }: CreateRanobeDto,
  ): Promise<Partial<Ranobe>> {
    const insertQuery =
      'INSERT INTO ranobes (id, title) VALUES ($1, $2) RETURNING id';
    const values = [id, title];
    const { rows } = await this.db.query(insertQuery, values);

    return rows[0];
  }

  //TODO add pagination
  async findAll(): Promise<Ranobe[]> {
    const selectQuery = 'SELECT * FROM ranobes';
    const { rows } = await this.db.query(selectQuery);

    return rows;
  }

  async findOne(id: string): Promise<Ranobe> {
    const selectQuery = 'SELECT * FROM ranobes WHERE id=$1';
    const values = [id];
    const { rows } = await this.db.query(selectQuery, values);

    return rows[0];
  }

  async update(id: string, { title }: UpdateRanobeDto): Promise<Ranobe> {
    const updateQuery = 'UPDATE ranobes SET title=$2 WHERE id=$1 RETURNING *';
    const values = [id, title];
    const { rows } = await this.db.query(updateQuery, values);

    return rows[0];
  }

  async remove(id: string): Promise<boolean> {
    const deleteQuery = 'DELETE FROM ranobes WHERE id=$1';
    const values = [id];
    const { rowCount } = await this.db.query(deleteQuery, values);

    return rowCount === 1;
  }
}
