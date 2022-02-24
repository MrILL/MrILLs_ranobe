import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RanobeDomainsController } from './ranobe-domains.controller'
import { RanobeDomainsService } from './ranobe-domains.service'
import { RanobeDomainsRepository } from './ranobe-domains.repository'
import { RanobesModule } from 'modules/ranobes'
import { RanobeDomain } from './ranobe-domain.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RanobeDomain]), RanobesModule],
  controllers: [RanobeDomainsController],
  providers: [RanobeDomainsService, RanobeDomainsRepository],
  exports: [RanobeDomainsService],
})
export class RanobeDomainsModule {}
