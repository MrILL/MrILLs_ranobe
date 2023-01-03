import { Injectable, Logger } from '@nestjs/common'
import { ScraperService } from 'modules/scraper'
import { ChaptersHttpException } from './chapters.exceptions'
import { ChaptersRepository, ChaptersRepositoryV2 } from './chapters.repository'
import { CreateChapterRequestDto, UpdateChapterRequestDto } from './dto'
import { Chapter } from './chapter.entity'
import { CreateChapterDto } from './dto/create-chapter.dto'

//TODO remove from all CRUD's scraping
//TODO add separate scrape method

@Injectable()
export class ChaptersService {
  private readonly logger = new Logger(ChaptersService.name)

  constructor(private readonly chaptersRepository: ChaptersRepository) {}

  async create(
    ranobeId: string,
    createChapterDto: CreateChapterRequestDto
  ): Promise<Chapter> {
    this.logger.debug(`attempt to create chapter for ranobe:${ranobeId}`)

    throw ChaptersHttpException.InternalServerError('Not implemented')
  }

  async findAll(ranobeId: string, domain: string): Promise<Chapter[]> {
    throw ChaptersHttpException.InternalServerError('Not implemented')
  }

  async findOne(
    ranobeId: string,
    domain: string,
    nomer: number
  ): Promise<Chapter> {
    throw ChaptersHttpException.InternalServerError('Not implemented')
  }

  async remove(ranobeId: string, domain: string, nomer: number): Promise<void> {
    throw ChaptersHttpException.InternalServerError('Not implemented')
  }
}

@Injectable()
export class ChaptersServiceV2 {
  private readonly logger = new Logger(ChaptersServiceV2.name)

  constructor(
    private readonly chaptersRepository: ChaptersRepositoryV2,
    private readonly scraperService: ScraperService
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    const checkByUrl = await this.chaptersRepository.findOneByUrl(
      createChapterDto.url
    )
    if (checkByUrl) {
      throw ChaptersHttpException.ConflictAlreadyExists(createChapterDto.url)
    }

    const { prevChapterSource, nextChapterSource, ...unchangedChapter } =
      createChapterDto
    const newChapter = Object.assign(new Chapter(), unchangedChapter)

    // const prevChapter = await this.findOneBySource(prevChapterSource)
    // const nextChapter = await this.findOneBySource(nextChapterSource)
    // newChapter.prevChapterId = prevChapter.id
    // newChapter.nextChapterId = nextChapter.id

    return this.chaptersRepository.create(newChapter)
  }

  async findAll() {
    return this.chaptersRepository.findAll()
  }

  // async findOne() {
  //   return this.chaptersRepository.findOne()
  // }

  async findOneByUrl(url: string) {
    return this.chaptersRepository.findOneByUrl(url)
  }
}

/**extension's behaviour on getting chapter:
  get chapter (if already scraped): GET /chapters/
  here is big question: get by WHAT?
  url -- too bad as param
  id -- can't get from chapter url or nearby context

  i think acceptable would be by using something like that:
  GET /ranobes/:title/chapters/:volume/:chapter

  for title will be used slug

  also what about adding domain here (like 'ranobelib.me' or 'ranobehub.com'):
   - nuh. Here I must think very clearly about what this app's purpose. Well, it's something in between extension (that give url of page and taking chapter or full ranobe) and parser that scrapes all needed data.
   So must have feature is saving scraped chapters & info (don't know in what way to store chapters list)
   
  features - saves info & chapters after scraping, and gives them on requests
  so for that would be 1 endpoint that triggers different services, that are responsible for saving : POST /scrape

  view already saved ranobes and chapters
  i thing about that:
  get all info's: GET /ranobes
  get info about title: GET /ranobes/:title

  get all chapters regardless on ranobe: GET /chapters
  get all chapters ragarding on ranobe: GET /chapters?ranobe=..
  get one chapter by id: GET /chapters/:chapterId

  then.. how to make relationship between chapters and ranobe --
  i.e. connect chapter to it's own ranobe
  but also taking in consideration that i want how have something like:
  ranobeId , chapterId (might be null) , chapterSource 
  and if chapterId is null -- chapter is not scraped, but only getted by scraping chapters list

  (but here is question about different domains: how it would look like)
  

  if can't get - scrape: POST /scrape/chapter
*/

/**
 * So...
 * 1. Provide connection between scraping info, list and chapter
 * 2. On every scraping data also save it
 *
 * Let's start from chapter without thinking about list, info, domain and else
 */
