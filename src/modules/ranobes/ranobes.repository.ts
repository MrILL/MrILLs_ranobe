import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Ranobe } from './ranobe.entity'
import { CreateRanobeDto, GetRanobesQuery, UpdateRanobeDto } from './dto'

@Injectable()
export class RanobesRepository {
  constructor(
    @InjectRepository(Ranobe)
    private readonly ranobeRepository: Repository<Ranobe>
  ) {}

  async create(createRanobeDto: CreateRanobeDto): Promise<Ranobe> {
    const newRanobe = Object.assign(new Ranobe(), createRanobeDto)

    return this.ranobeRepository.save(newRanobe)
  }

  async findAll(query: GetRanobesQuery = {}): Promise<Ranobe[]> {
    const qb = this.ranobeRepository.createQueryBuilder('ranobes')

    if (query.domain) {
      qb.andWhere('ranobes.domain = :domain', { domain: query.domain })
    }

    return qb.getMany()
  }

  async findOne(ranobeId: string): Promise<Ranobe> {
    return this.ranobeRepository.findOneBy({ id: ranobeId })
  }

  async findOneByUrl(url: string): Promise<Ranobe> {
    return this.ranobeRepository.findOneBy({ url })
  }

  async update(
    ranobeId: string,
    updateRanobedto: UpdateRanobeDto
  ): Promise<Ranobe> {
    const updatedRanobe: Ranobe = Object.assign(
      new Ranobe(),
      { id: ranobeId },
      updateRanobedto
    )

    return this.ranobeRepository.save(updatedRanobe)
  }

  async remove(ranobeId: string): Promise<void> {
    const ranobe = await this.ranobeRepository.findOneBy({ id: ranobeId })

    await this.ranobeRepository.remove(ranobe)
  }
}
