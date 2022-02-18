import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { DbModule } from 'src/db'
import { RanobesModule } from 'src/ranobes'
import { RanobeDomainsRepository } from './ranobe-domains.repository'
import { RanobeDomainsService } from './ranobe-domains.service'

describe('RanobeDomainsService', () => {
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
      providers: [RanobeDomainsService, RanobeDomainsRepository],
    }).compile()

    service = module.get<RanobeDomainsService>(RanobeDomainsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
