import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { DbModule } from 'db'
import { RanobesRepository } from './ranobes.repository'
import { RanobesService } from './ranobes.service'

describe('RanobesService', () => {
  let service: RanobesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
      ],
      providers: [RanobesService, RanobesRepository],
    }).compile()

    service = module.get<RanobesService>(RanobesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
