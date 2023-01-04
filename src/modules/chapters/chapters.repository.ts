import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Chapter } from './chapter.entity'

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

  async findOne(chapterId: string): Promise<Chapter> {
    return this.chapterRepository.findOneBy({
      id: chapterId,
    })
  }

  async findOneByUrl(url: string): Promise<Chapter> {
    return this.chapterRepository.findOneBy({
      url,
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
