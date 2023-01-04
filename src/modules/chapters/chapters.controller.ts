import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common'

import { ChaptersServiceV2 } from './chapters.service'
import { Chapter } from './chapter.entity'
import { CreateChapterDto } from './dto/create-chapter.dto'

// TODO add in dev guard
@Controller({
  path: 'chapters',
  version: '2',
})
export class ChaptersControllerV2 {
  constructor(private readonly chaptersService: ChaptersServiceV2) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createChapterDto: CreateChapterDto): Promise<Chapter> {
    return this.chaptersService.create(createChapterDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Chapter[]> {
    return this.chaptersService.findAll()
  }

  @Get(':chapter')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('chapter') chapterId: string): Promise<Chapter> {
    return this.chaptersService.findOne(chapterId)
  }

  @Delete(':chapter')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeOne(@Param('chapter') chapterId: string): Promise<void> {
    return this.chaptersService.removeOne(chapterId)
  }
}
