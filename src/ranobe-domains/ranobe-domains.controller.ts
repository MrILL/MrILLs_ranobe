import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RanobeDomainsService } from './ranobe-domains.service';
import { CreateRanobeDomainDto, UpdateRanobeDomainDto } from './dto';
import { RanobeDomain } from './entities';

@Controller('ranobes/:ranobe/domains')
export class RanobeDomainsController {
  constructor(private readonly ranobeDomainsService: RanobeDomainsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('ranobe') ranobeId: string,
    @Body() createRanobeDomainDto: CreateRanobeDomainDto,
  ): Promise<Partial<RanobeDomain>> {
    return this.ranobeDomainsService.create(ranobeId, createRanobeDomainDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('ranobe') ranobeId: string): Promise<RanobeDomain[]> {
    return this.ranobeDomainsService.findAll(ranobeId);
  }

  @Get(':domain')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string,
  ): Promise<RanobeDomain> {
    return this.ranobeDomainsService.findOne(ranobeId, domain);
  }

  @Put(':domain')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string,
    @Body() updateRanobeDomainDto: UpdateRanobeDomainDto,
  ): Promise<RanobeDomain> {
    return this.ranobeDomainsService.update(
      ranobeId,
      domain,
      updateRanobeDomainDto,
    );
  }

  @Delete(':domain')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string,
  ): Promise<void> {
    return this.ranobeDomainsService.remove(ranobeId, domain);
  }
}
