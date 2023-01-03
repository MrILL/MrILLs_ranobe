import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'

import { CreateChapterDto } from 'modules/chapters/dto'
import { RanobeChaptersService } from './ranobe-chapters.service'

@Controller()
export class RanobeChaptersController {
  constructor(private readonly ranobeChaptersService: RanobeChaptersService) {}

  @Post('ranobes/:ranobe/chapters')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('ranobe') ranobeId: string,
    @Body() createChapterDto: CreateChapterDto
  ) {
    return this.ranobeChaptersService.createChapter(ranobeId, createChapterDto)
  }

  @Get('ranobes/:ranobe/chapters')
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('ranobe') ranobeId: string) {
    return this.ranobeChaptersService.getAllChapters(ranobeId)
  }
}
