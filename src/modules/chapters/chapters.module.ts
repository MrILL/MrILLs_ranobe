import { Module } from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { ChaptersController } from './chapters.controller'
import { RanobeDomainsModule } from 'modules/ranobe-domains'
import { ChaptersRepository } from './chapters.repository'
import { ScraperModule } from 'modules/scraper'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chapter } from './chapter.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Chapter]),
    RanobeDomainsModule,
    ScraperModule,
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChaptersRepository],
})
export class ChaptersModule {}
