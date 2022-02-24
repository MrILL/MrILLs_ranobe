import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { CreateChapterRequestDto, UpdateChapterRequestDto } from './dto'
import { Chapter } from './chapter.entity'

@Controller('ranobes/:ranobe')
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
    @Param('chapter') nomer: string
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

  @Delete('domains/:domain/chapters/:chapter')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string,
    @Param('chapter') nomer: string
  ): Promise<void> {
    return this.chaptersService.remove(ranobeId, domain, nomer)
  }
}
