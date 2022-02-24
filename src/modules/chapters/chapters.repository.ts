import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RanobeDomain } from 'modules/ranobe-domains'
import { Repository } from 'typeorm'
import { Chapter } from './chapter.entity'
import { ChapterDto } from './dto'

@Injectable()
export class ChaptersRepository {
  constructor(
    @InjectRepository(Chapter)
    private readonly chapterRepository: Repository<Chapter>
  ) {}

  async create(
    ranobeDomain: RanobeDomain,
    createChapterDto: ChapterDto
  ): Promise<Chapter> {
    const newChapter = Object.assign(new Chapter(), createChapterDto, {
      ranobeDomain,
    })

    return this.chapterRepository.save(newChapter)
  }

  async findAll(ranobeDomainId: string): Promise<Chapter[]> {
    return this.chapterRepository.find({
      where: {
        ranobeDomain: {
          id: ranobeDomainId,
        },
      },
      relations: ['ranobeDomain'],
    })
  }

  async findOne(ranobeDomainId: string, nomer: string): Promise<Chapter> {
    return this.chapterRepository.findOne({
      where: {
        nomer,
        ranobeDomain: {
          id: ranobeDomainId,
        },
      },
      relations: ['ranobeDomain'],
    })
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
    const chapter = await this.chapterRepository.findOne(chapterId)

    await this.chapterRepository.remove(chapter)
  }
}
