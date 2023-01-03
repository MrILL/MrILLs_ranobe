import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ChaptersHttpException } from './chapters.exceptions'
import { Chapter } from './chapter.entity'
import { ChapterDto } from './dto'

@Injectable()
export class ChaptersRepository {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>
  ) {}

  async create(createChapterDto: ChapterDto): Promise<Chapter> {
    throw ChaptersHttpException.InternalServerError('Not implemented')
  }

  async findAll(ranobeDomainId: string): Promise<Chapter[]> {
    return this.chapterRepository.find()
    // return this.chapterRepository.find({
    //   where: {
    //     ranobeDomain: {
    //       id: ranobeDomainId,
    //     },
    //   },
    //   relations: ['ranobeDomain'],
    // })
  }

  async findOne(ranobeDomainId: string, nomer: string): Promise<Chapter> {
    return this.chapterRepository.findOne({
      where: {
        nomer,
      },
    })
    // return this.chapterRepository.findOne({
    //   where: {
    //     nomer,
    //     ranobeDomain: {
    //       id: ranobeDomainId,
    //     },
    //   },
    //   relations: ['ranobeDomain'],
    // })
  }

  async update(
    chapterId: string,
    updateChapterDto: ChapterDto
  ): Promise<Chapter> {
    const updatedChapter: Chapter = Object.assign(
      new Chapter(),
      updateChapterDto,
      {
        id: chapterId,
      }
    )

    return this.chapterRepository.save(updatedChapter)
  }

  async remove(chapterId: string): Promise<void> {
    const chapter = await this.chapterRepository.findOneBy({ id: chapterId })

    await this.chapterRepository.remove(chapter)
  }
}

@Injectable()
export class ChaptersRepositoryV2 {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>
  ) {}

  async create(createChapterDto: Chapter): Promise<Chapter> {
    const newChapter = Object.assign(new Chapter(), createChapterDto)

    return this.chapterRepository.save(newChapter)
  }

  async findAll(): Promise<Chapter[]> {
    return this.chapterRepository.find()
  }

  async findOne(nomer: string): Promise<Chapter> {
    return this.chapterRepository.findOne({
      where: {
        nomer,
      },
    })
  }

  async findOneByUrl(url: string): Promise<Chapter> {
    return this.chapterRepository.findOne({
      where: {
        url,
      },
    })
  }

  // async update(
  //   chapterId: string,
  //   updateChapterDto: ChapterDto //TODO check ChapterDto
  // ): Promise<Chapter> {
  //   const updatedChapter: Chapter = Object.assign(
  //     new Chapter(),
  //     updateChapterDto,
  //     {
  //       id: chapterId,
  //     }
  //   )

  //   return this.chapterRepository.save(updatedChapter)
  // }

  async remove(chapterId: string): Promise<void> {
    const chapter = await this.chapterRepository.findOneBy({ id: chapterId })

    await this.chapterRepository.remove(chapter)
  }
}
