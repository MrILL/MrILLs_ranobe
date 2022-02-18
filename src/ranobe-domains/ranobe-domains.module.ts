import { Module } from '@nestjs/common'
import { RanobeDomainsController } from './ranobe-domains.controller'
import { RanobeDomainsService } from './ranobe-domains.service'
import { RanobeDomainsRepository } from './ranobe-domains.repository'
import { DbModule } from 'src/db'
import { RanobesModule } from 'src/ranobes'

@Module({
  imports: [DbModule, RanobesModule],
  controllers: [RanobeDomainsController],
  providers: [RanobeDomainsService, RanobeDomainsRepository],
  exports: [RanobeDomainsService],
})
export class RanobeDomainsModule {}
