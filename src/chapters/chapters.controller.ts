import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { ChaptersService } from './chapters.service'
import { CreateChapterDto, UpdateChapterDto } from './dto'
import { Chapter } from './entities'

@Controller('ranobes/:ranobe')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post('chapters')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('ranobe') ranobeId: string,
    @Body() createChapterDto: CreateChapterDto
  ): Promise<Partial<Chapter>> {
    return this.chaptersService.create(ranobeId, createChapterDto)
  }

  @Get('chapters')
  @HttpCode(HttpStatus.OK)
  findAll(
    @Param('ranobe') ranobeId: string,
    @Query('domain') domain: string
  ): Promise<Chapter[]> {
    return this.chaptersService.findAll(ranobeId, domain)
  }

  @Get(':domain/chapters/:chapter')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string,
    @Param('chapter') nomer: number
  ): Promise<Chapter> {
    return this.chaptersService.findOne(ranobeId, domain, nomer)
  }

  // @Put(':domain/chapters/:chapter')
  // @HttpCode(HttpStatus.OK)
  // update(
  //   @Param('ranobe') ranobeId: string,
  //   @Param('chapter') chapterId: string,
  //   @Body() updateChapterDto: UpdateChapterDto,
  // ): Promise<Chapter> {
  //   return this.chaptersService.update(ranobeId, chapterId, updateChapterDto);
  // }

  @Delete(':domain/chapters/:chapter')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('ranobe') ranobeId: string,
    @Param('domain') domain: string,
    @Param('chapter') nomer: number
  ): Promise<void> {
    return this.chaptersService.remove(ranobeId, domain, nomer)
  }
}
