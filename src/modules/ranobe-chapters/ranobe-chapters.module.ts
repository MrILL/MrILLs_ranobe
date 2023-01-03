import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RanobesModule } from 'modules/ranobes'
import { ChaptersModule } from 'modules/chapters'

import { RanobeChaptersController } from './ranobe-chapters.controller'
import { RanobeChaptersService } from './ranobe-chapters.service'
import { RanobeChapters } from './ranobe-chapter.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([RanobeChapters]),
    RanobesModule,
    ChaptersModule,
  ],
  controllers: [RanobeChaptersController],
  providers: [RanobeChaptersService],
  exports: [],
})
export class RanobeChaptersModule {}
