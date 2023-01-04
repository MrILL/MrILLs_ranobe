import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'

import { Chapter } from 'modules/chapters'
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
  ): Promise<Chapter> {
    return this.ranobeChaptersService.createChapter(ranobeId, createChapterDto)
  }

  @Get('ranobes/:ranobe/chapters')
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('ranobe') ranobeId: string): Promise<Chapter[]> {
    return this.ranobeChaptersService.findAllChapters(ranobeId)
  }

  @Get('ranobes/:ranobe/chapters/:volume/:nomer')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('ranobe') ranobeId: string,
    @Param('volume') volume: number,
    @Param('nomer') nomer: string
  ): Promise<Chapter> {
    return this.ranobeChaptersService.findOneChapter(ranobeId, volume, nomer)
  }
}
