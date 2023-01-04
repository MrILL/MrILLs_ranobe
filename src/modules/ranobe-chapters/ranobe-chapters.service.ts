import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RanobesService } from 'modules/ranobes'
import { Chapter, ChaptersServiceV2 } from 'modules/chapters'
import { CreateChapterDto } from 'modules/chapters/dto'

import { RanobeChapters } from './ranobe-chapter.entity'

@Injectable()
export class RanobeChaptersService {
  constructor(
    @InjectRepository(RanobeChapters)
    private readonly ranobeChaptersRepository: Repository<RanobeChapters>,
    private readonly ranobesService: RanobesService,
    private readonly chaptersService: ChaptersServiceV2
  ) {}

  async createChapter(
    ranobeId: string,
    createChapterDto: CreateChapterDto
  ): Promise<Chapter> {
    const ranobe = await this.ranobesService.findOne(ranobeId)

    // Check chapter by url
    try {
      const checkChapterByUrl = await this.chaptersService.findOneByUrl(
        createChapterDto.url
      )
      if (checkChapterByUrl) {
        throw new ConflictException(
          `Chapter with url:${createChapterDto.url} already exists`
        )
      }
    } catch (e) {
      if (!(e instanceof NotFoundException)) {
        throw e
      }
    }

    // Check chapter in ranobe by volume & nomer
    try {
      // const checkChapterByVolNo = await this.ranobeChaptersRepository.findOne(
      //   ranobe,
      //   createChapterDto.volume,
      //   createChapterDto.nomer
      // )
      const checkChapterByVolNo = await this.ranobeChaptersRepository.findOne({
        where: {
          ranobe: {
            id: ranobe.id,
          },
          chapter: {
            volume: createChapterDto.volume,
            nomer: createChapterDto.nomer,
          },
        },
      })
      if (checkChapterByVolNo) {
        throw new ConflictException(
          `Chapter of this ranobe with volume ${createChapterDto.volume} and nomer ${createChapterDto.nomer} already exists`
        )
      }
    } catch (e) {
      if (!(e instanceof NotFoundException)) {
        throw e
      }
    }

    const chapter = await this.chaptersService.create(createChapterDto)

    const newRanobeChapter = new RanobeChapters()
    newRanobeChapter.chapter = chapter
    newRanobeChapter.ranobe = ranobe

    await this.ranobeChaptersRepository.save(newRanobeChapter)

    return chapter
  }

  async findAllChapters(ranobeId: string): Promise<Chapter[]> {
    const ranobe = await this.ranobesService.findOne(ranobeId)

    const ranobeChapters = await this.ranobeChaptersRepository.find({
      relations: {
        ranobe: true,
        chapter: true,
      },
      where: {
        ranobe: {
          id: ranobe.id,
        },
      },
    })

    const chapters = ranobeChapters.map(({ chapter }) => chapter)
    if (chapters.length === 0) {
      throw new NotFoundException(
        `Ranobe with id:${ranobe.id} have no chapters`
      )
    }

    return chapters
  }

  async findOneChapter(ranobeId, volume, nomer): Promise<Chapter> {
    const ranobe = await this.ranobesService.findOne(ranobeId)

    const ranobeChapter = await this.ranobeChaptersRepository.findOne({
      relations: {
        ranobe: true,
        chapter: true,
      },
      where: {
        ranobe: {
          id: ranobe.id,
        },
        chapter: {
          volume,
          nomer,
        },
      },
    })
    if (!ranobeChapter) {
      throw new NotFoundException(
        `Not found chapter of ranobe:${ranobe.id} with v:${volume} n:${nomer}`
      )
    }

    const chapter = ranobeChapter.chapter

    return chapter
  }
}
