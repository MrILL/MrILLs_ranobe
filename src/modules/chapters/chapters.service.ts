import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ChaptersHttpException } from './chapters.exceptions'
import { ChaptersRepositoryV2 } from './chapters.repository'
import { Chapter } from './chapter.entity'
import { CreateChapterDto } from './dto/create-chapter.dto'

@Injectable()
export class ChaptersServiceV2 {
  private readonly logger = new Logger(ChaptersServiceV2.name)

  constructor(private readonly chaptersRepository: ChaptersRepositoryV2) {}

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const checkByUrl = await this.chaptersRepository.findOneByUrl(
      createChapterDto.url
    )
    if (checkByUrl) {
      throw ChaptersHttpException.ConflictUrl(createChapterDto.url)
    }

    const { prevChapterSource, nextChapterSource, ...unchangedChapter } =
      createChapterDto
    const newChapter = Object.assign(new Chapter(), unchangedChapter)
    const prevNextChaptersPromise = [prevChapterSource, nextChapterSource].map(
      async (chapterUrl) => {
        try {
          const chapter = await this.findOneByUrl(chapterUrl)

          return chapter.id
        } catch (e) {
          if (!(e instanceof NotFoundException)) {
            throw e
          }
          return null
        }
      }
    )
    const [prevChapterId, nextChapterId] = await Promise.all(
      prevNextChaptersPromise
    )
    newChapter.prevChapterId = prevChapterId
    newChapter.nextChapterId = nextChapterId

    return this.chaptersRepository.create(newChapter)
  }

  async findAll(): Promise<Chapter[]> {
    const res = await this.chaptersRepository.findAll()
    if (!res || res.length === 0) {
      throw new NotFoundException('Not found chapters')
    }

    return res
  }

  async findOne(chapterId: string): Promise<Chapter> {
    const res = await this.chaptersRepository.findOne(chapterId)
    if (!res) {
      throw new NotFoundException(`Not found chapter with id:${chapterId}`)
    }

    return res
  }

  async findOneByUrl(url: string): Promise<Chapter> {
    const res = await this.chaptersRepository.findOneByUrl(url)
    if (!res) {
      throw new NotFoundException(`Not found chapter with url:${url}`)
    }

    return res
  }

  async removeOne(chapterId: string): Promise<void> {
    const chapter = await this.chaptersRepository.findOne(chapterId)
    if (!chapter) {
      throw new NotFoundException(`Not found chapter with id:${chapterId}`)
    }

    await this.chaptersRepository.remove(chapterId)
  }
}
