import { Injectable } from '@nestjs/common'
import { RanobeDomainsRepository } from './ranobe-domains.repository'
import { RanobesService } from 'modules/ranobes'
import { RanobeDomainsHttpException } from './ranobe-domains.exceptions'
import { RanobeDomain } from './ranobe-domain.entity'
import { CreateRanobeDomainDto, UpdateRanobeDomainDto } from './dto'

@Injectable()
export class RanobeDomainsService {
  constructor(
    private readonly ranobeDomainsRepository: RanobeDomainsRepository,
    private readonly ranobesService: RanobesService
  ) {}

  async create(
    ranobeId: string,
    createRanobeDomainDto: CreateRanobeDomainDto
  ): Promise<Partial<RanobeDomain>> {
    const ranobe = await this.ranobesService.findOne(ranobeId)
    if (!ranobe) {
      throw RanobeDomainsHttpException.RanobeNotFound()
    }

    const domain = new URL(createRanobeDomainDto.source).hostname
    const checkDomain = await this.ranobeDomainsRepository.findOne(
      ranobeId,
      domain
    )
    if (checkDomain) {
      throw RanobeDomainsHttpException.Conflict()
    }

    //TODO add info via scraping

    const res = await this.ranobeDomainsRepository.create(
      ranobe,
      domain,
      createRanobeDomainDto
    )
    if (!res) {
      throw RanobeDomainsHttpException.InternalServerError(
        'unable to create record'
      )
    }

    //TODO add chapters via scraping

    return res
  }

  async findAll(ranobeId: string): Promise<RanobeDomain[]> {
    const res = await this.ranobeDomainsRepository.findAll(ranobeId)
    if (!res || res.length === 0) {
      throw RanobeDomainsHttpException.NotFound()
    }

    return res
  }

  async findOne(ranobeId: string, domain: string): Promise<RanobeDomain> {
    const res = await this.ranobeDomainsRepository.findOne(ranobeId, domain)
    if (!res) {
      throw RanobeDomainsHttpException.NotFound()
    }

    return res
  }

  async update(
    ranobeId: string,
    domain: string,
    updateRanobeDomainDto: UpdateRanobeDomainDto
  ): Promise<void> {
    const checkDomain = await this.ranobeDomainsRepository.findOne(
      ranobeId,
      domain
    )
    if (!checkDomain) {
      throw RanobeDomainsHttpException.NotFound()
    }

    const newDomain = new URL(updateRanobeDomainDto.source).hostname
    if (newDomain !== domain) {
      throw RanobeDomainsHttpException.DomainUpdateConflict()
    }

    //TODO update info via scraping using source from checkDomain obj

    await this.ranobeDomainsRepository.update(
      checkDomain.id,
      updateRanobeDomainDto
    )
  }

  async remove(ranobeId: string, domain: string): Promise<void> {
    const checkDomain = await this.ranobeDomainsRepository.findOne(
      ranobeId,
      domain
    )
    if (!checkDomain) {
      throw RanobeDomainsHttpException.NotFound()
    }

    await this.ranobeDomainsRepository.remove(checkDomain.id)
  }
}
