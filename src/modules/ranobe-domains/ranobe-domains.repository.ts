import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RanobeDomain } from './ranobe-domain.entity'
import { CreateRanobeDomainDto, UpdateRanobeDomainDto } from './dto'
import { Ranobe } from 'modules/ranobes'

@Injectable()
export class RanobeDomainsRepository {
  constructor(
    @InjectRepository(RanobeDomain)
    private readonly ranobeDomainRepository: Repository<RanobeDomain>
  ) {}

  async create(
    ranobe: Ranobe,
    domain: string,
    createRanobeDomainDto: CreateRanobeDomainDto
  ): Promise<Partial<RanobeDomain>> {
    const newRanobeDomain = Object.assign(
      new RanobeDomain(),
      createRanobeDomainDto,
      {
        domain,
        ranobe,
      }
    )

    return this.ranobeDomainRepository.save(newRanobeDomain)
  }

  async findAll(ranobeId: string): Promise<RanobeDomain[]> {
    return this.ranobeDomainRepository.find({
      where: {
        ranobe: {
          id: ranobeId,
        },
      },
      relations: ['ranobe'],
    })
  }

  async findOne(ranobeId: string, domain: string): Promise<RanobeDomain> {
    return this.ranobeDomainRepository.findOne({
      where: {
        domain,
        ranobe: {
          id: ranobeId,
        },
      },
      relations: ['ranobe'],
    })
  }

  async update(
    ranobeDomainId: string,
    updateRanobeDomainDto: UpdateRanobeDomainDto
  ): Promise<RanobeDomain> {
    const updatedRanobeDomain: RanobeDomain = Object.assign(
      new RanobeDomain(),
      updateRanobeDomainDto,
      {
        id: ranobeDomainId,
      }
    )

    return this.ranobeDomainRepository.save(updatedRanobeDomain)
  }

  async remove(ranobeDomainId: string): Promise<void> {
    const ranobeDomain = await this.ranobeDomainRepository.findOneBy({
      id: ranobeDomainId,
    })

    await this.ranobeDomainRepository.remove(ranobeDomain)
  }
}
