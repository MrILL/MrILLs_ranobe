import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { DbModule } from 'src/db'
import { RanobeDomainsModule } from 'src/ranobe-domains'
import { ScraperModule } from 'src/scraper'
import { ChaptersRepository } from './chapters.repository'
import { ChaptersService } from './chapters.service'

describe('ChaptersService', () => {
  let service: ChaptersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
        RanobeDomainsModule,
        ScraperModule.forRoot(),
      ],
      providers: [ChaptersService, ChaptersRepository],
    }).compile()

    service = module.get<ChaptersService>(ChaptersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
