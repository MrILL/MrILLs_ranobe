import { Module } from '@nestjs/common'
import { ChaptersService, ChaptersServiceV2 } from './chapters.service'
import { ChaptersController, ChaptersControllerV2 } from './chapters.controller'
import { ChaptersRepository, ChaptersRepositoryV2 } from './chapters.repository'
import { ScraperModule } from 'modules/scraper'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chapter } from './chapter.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Chapter]), ScraperModule],
  controllers: [
    // ChaptersController,
    ChaptersControllerV2,
  ],
  providers: [
    ChaptersService,
    ChaptersRepository,
    ChaptersServiceV2,
    ChaptersRepositoryV2,
  ],
  exports: [ChaptersService, ChaptersServiceV2],
})
export class ChaptersModule {}
