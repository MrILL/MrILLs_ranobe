import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RanobeDomain } from './ranobe-domain.entity'
import { CreateRanobeDomainDto, UpdateRanobeDomainDto } from './dto'

@Injectable()
export class RanobeDomainsRepository {
  constructor(
    @InjectRepository(RanobeDomain)
    private readonly db: Repository<RanobeDomain>
  ) {}

  async create(
    id: string,
    ranobeId: string,
    domain: string,
    { url }: CreateRanobeDomainDto
  ): Promise<Partial<RanobeDomain>> {
    const insertQuery =
      'INSERT INTO ranobeDomains (id, ranobeId, domain, source) \
      VALUES ($1, $2, $3, $4) RETURNING domain'
    const values = [id, ranobeId, domain, url]
    const { rows } = await this.db.query(insertQuery, values)

    return rows[0]
  }

  async findAll(ranobeId: string): Promise<RanobeDomain[]> {
    const selectQuery = 'SELECT * FROM ranobeDomains WHERE ranobeId=$1'
    const values = [ranobeId]
    const { rows } = await this.db.query(selectQuery, values)
    return rows
  }

  async findOne(ranobeId: string, domain: string): Promise<RanobeDomain> {
    const selectQuery =
      'SELECT * FROM ranobeDomains WHERE ranobeId=$1 AND domain=$2'
    const values = [ranobeId, domain]
    const { rows } = await this.db.query(selectQuery, values)

    return rows[0]
  }

  async update(
    ranobeId: string,
    domain: string,
    { url }: UpdateRanobeDomainDto
  ): Promise<RanobeDomain> {
    const updateQuery =
      'UPDATE ranobeDomains \
      SET source=$3 \
      WHERE ranobeId=$1 AND domain=$2 \
      RETURNING *'
    const values = [ranobeId, domain, url]
    const { rows } = await this.db.query(updateQuery, values)

    return rows[0]
  }

  async remove(ranobeId: string, domain: string): Promise<boolean> {
    const deleteQuery =
      'DELETE FROM ranobeDomains WHERE ranobeId=$1 AND domain=$2'
    const values = [ranobeId, domain]
    const { rowCount } = await this.db.query(deleteQuery, values)

    return rowCount === 1
  }
}
