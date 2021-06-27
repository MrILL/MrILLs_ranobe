import { Injectable } from '@nestjs/common';
import { RanobeDomainsRepository } from './ranobe-domains.repository';
import { RanobesService } from 'src/ranobes';
import { genBase64UID } from 'src/utils';
import { RanobeDomainsHttpException } from './ranobe-domains.exceptions';
import { RanobeDomain } from './entities';
import { CreateRanobeDomainDto, UpdateRanobeDomainDto } from './dto';

@Injectable()
export class RanobeDomainsService {
  constructor(
    private readonly ranobeDomainsRepository: RanobeDomainsRepository,
    private readonly ranobesService: RanobesService,
  ) {}

  async create(
    ranobeId: string,
    createRanobeDomainDto: CreateRanobeDomainDto,
  ): Promise<RanobeDomain> {
    const ranobe = await this.ranobesService.findOne(ranobeId);
    if (!ranobe) {
      throw RanobeDomainsHttpException.RanobeNotFound();
    }

    const domain = new URL(createRanobeDomainDto.url).hostname;
    const checkDomain = await this.ranobeDomainsRepository.findOne(
      ranobeId,
      domain,
    );
    if (checkDomain) {
      throw RanobeDomainsHttpException.Conflict();
    }

    //TODO add info via scraping

    const res = await this.ranobeDomainsRepository.create(
      genBase64UID(7),
      ranobeId,
      domain,
      createRanobeDomainDto,
    );
    if (!res) {
      throw RanobeDomainsHttpException.InternalServerError(
        'unable to create record',
      );
    }

    //TODO add chapters via scraping

    return res;
  }

  async findAll(ranobeId: string): Promise<RanobeDomain[]> {
    const res = await this.ranobeDomainsRepository.findAll(ranobeId);
    if (!res || res.length === 0) {
      throw RanobeDomainsHttpException.NotFound();
    }

    return res;
  }

  async findOne(ranobeId: string, domain: string): Promise<RanobeDomain> {
    const res = await this.ranobeDomainsRepository.findOne(ranobeId, domain);
    if (!res) {
      throw RanobeDomainsHttpException.NotFound();
    }

    return res;
  }

  async update(
    ranobeId: string,
    domain: string,
    updateRanobeDomainDto: UpdateRanobeDomainDto,
  ): Promise<RanobeDomain> {
    const checkDomain = await this.ranobeDomainsRepository.findOne(
      ranobeId,
      domain,
    );
    if (!checkDomain) {
      throw RanobeDomainsHttpException.NotFound();
    }

    //TODO update info via scraping using source from checkDomain obj

    const res = await this.ranobeDomainsRepository.update(
      ranobeId,
      domain,
      updateRanobeDomainDto,
    );
    if (!res) {
      throw RanobeDomainsHttpException.InternalServerError(
        'unable to update record',
      );
    }

    return res;
  }

  async remove(ranobeId: string, domain: string): Promise<void> {
    const checkDomain = await this.ranobeDomainsRepository.findOne(
      ranobeId,
      domain,
    );
    if (!checkDomain) {
      throw RanobeDomainsHttpException.NotFound();
    }

    const res = await this.ranobeDomainsRepository.remove(ranobeId, domain);
    if (!res) {
      throw RanobeDomainsHttpException.InternalServerError(
        'unable to delete record',
      );
    }
  }
}
