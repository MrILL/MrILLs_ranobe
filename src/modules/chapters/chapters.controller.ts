import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'

import { ChaptersService, ChaptersServiceV2 } from './chapters.service'
import { CreateChapterRequestDto, UpdateChapterRequestDto } from './dto'
import { Chapter } from './chapter.entity'
import { CreateChapterDto } from './dto/create-chapter.dto'

@Controller('ranobes/:ranobe/')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post('chapters')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('ranobe') ranobeId: string,
    @Body() createChapterDto: CreateChapterRequestDto
  ): Promise<Chapter> {
    return this.chaptersService.create(ranobeId, createChapterDto)
  }

  @Get('domains/:domain/chapters')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string
  ): Promise<Chapter[]> {
    return this.chaptersService.findAll(ranobeId, domain)
  }

  @Get('domains/:domain/chapters/:chapter')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string,
    @Param('chapter') nomer: number
  ): Promise<Chapter> {
    return this.chaptersService.findOne(ranobeId, domain, nomer)
  }

  // @Put('domains/:domain/chapters/:chapter')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // update(
  //   @Param('ranobe') ranobeId: string,
  //   @Param('domain') domain: string,
  //   @Param('chapter') chapterId: string,
  //   @Body() updateChapterDto: UpdateChapterDto,
  // ): Promise<Chapter> {
  //   return this.chaptersService.update(ranobeId, chapterId, updateChapterDto);
  // }

  // @Delete('domains/:domain/chapters/:chapter')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(
  //   @Param('ranobe') ranobeId: string,
  //   @Param('domain') domain: string,
  //   @Param('chapter') nomer: number
  // ): Promise<void> {
  //   return this.chaptersService.remove(ranobeId, domain, nomer)
  // }
}

// TODO add admin guard
@Controller({
  path: 'chapters',
  version: '2',
})
export class ChaptersControllerV2 {
  constructor(private readonly chaptersService: ChaptersServiceV2) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createChapterDto: CreateChapterDto): Promise<Chapter> {
    return this.chaptersService.create(createChapterDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Chapter[]> {
    return this.chaptersService.findAll()
  }
}
