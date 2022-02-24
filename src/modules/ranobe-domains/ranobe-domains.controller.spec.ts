import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { DbModule } from 'db'
import { RanobesModule } from 'ranobes'
import { RanobeDomainsController } from './ranobe-domains.controller'
import { RanobeDomainsRepository } from './ranobe-domains.repository'
import { RanobeDomainsService } from './ranobe-domains.service'

describe('RanobeDomainsController', () => {
  let controller: RanobeDomainsController
  let service: RanobeDomainsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
        RanobesModule,
      ],
      controllers: [RanobeDomainsController],
      providers: [RanobeDomainsService, RanobeDomainsRepository],
    }).compile()

    controller = module.get<RanobeDomainsController>(RanobeDomainsController)
    service = module.get<RanobeDomainsService>(RanobeDomainsService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })
})
