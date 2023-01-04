import { Module } from '@nestjs/common'
import { ChaptersServiceV2 } from './chapters.service'
import { ChaptersControllerV2 } from './chapters.controller'
import { ChaptersRepositoryV2 } from './chapters.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Chapter } from './chapter.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Chapter])],
  controllers: [ChaptersControllerV2],
  providers: [ChaptersServiceV2, ChaptersRepositoryV2],
  exports: [ChaptersServiceV2],
})
export class ChaptersModule {}
