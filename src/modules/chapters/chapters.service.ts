import { Injectable, Logger } from '@nestjs/common'
import { RanobeDomainsService } from 'modules/ranobe-domains/ranobe-domains.service'
import { ScraperService } from 'modules/scraper'
import { ChaptersHttpException } from './chapters.exceptions'
import { ChaptersRepository } from './chapters.repository'
import { CreateChapterRequestDto, UpdateChapterRequestDto } from './dto'
import { Chapter } from './chapter.entity'

@Injectable()
export class ChaptersService {
  private readonly logger = new Logger(ChaptersService.name)

  constructor(
    private readonly chaptersRepository: ChaptersRepository,
    private readonly ranobeDomainsService: RanobeDomainsService,
    private readonly scraperService: ScraperService
  ) {}

  async create(
    ranobeId: string,
    createChapterDto: CreateChapterRequestDto
  ): Promise<Chapter> {
    this.logger.debug(`attempt to create chapter for ranobe:${ranobeId}`)

    const domain = this.scraperService.extractDomain(createChapterDto.source)
    this.logger.debug(`ranobe domain:${domain}`)
    const checkRanobeDomain = await this.ranobeDomainsService.findOne(
      ranobeId,
      domain
    )
    //TODO decide about creating domain
    if (!checkRanobeDomain) {
      throw ChaptersHttpException.DomainNotFound()
    }

    //TODO inspect if wrong url or if not full data in return
    const chapter: any = await this.scraperService.extractChapter(
      createChapterDto.source
    )
    if (!chapter || !chapter.isCorrect()) {
      throw ChaptersHttpException.NotAcceptable()
    }
    chapter.source = createChapterDto.source

    const checkChapter = await this.chaptersRepository.findOne(
      checkRanobeDomain.id,
      chapter.nomer
    )
    if (checkChapter) {
      throw ChaptersHttpException.Conflict()
    }

    return this.chaptersRepository.create(checkRanobeDomain, chapter)
  }

  async findAll(ranobeId: string, domain: string): Promise<Chapter[]> {
    const checkRanobeDomain = await this.ranobeDomainsService.findOne(
      ranobeId,
      domain
    )
    if (!checkRanobeDomain) {
      // throw new RanobeNotFoundError; //TODO interception
      throw ChaptersHttpException.DomainNotFound()
    }

    const res = await this.chaptersRepository.findAll(checkRanobeDomain.id)
    if (!res || res.length == 0) {
      throw ChaptersHttpException.NotFound()
    }

    return res
  }

  async findOne(
    ranobeId: string,
    domain: string,
    nomer: string
  ): Promise<Chapter> {
    const ranobeDomain = await this.ranobeDomainsService.findOne(
      ranobeId,
      domain
    )
    if (!ranobeDomain) {
      throw ChaptersHttpException.DomainNotFound()
    }

    const res = await this.chaptersRepository.findOne(ranobeDomain.id, nomer)
    if (!res) {
      throw ChaptersHttpException.NotFound()
    }

    return res
  }

  // async update(
  //   ranobeId: string,
  //   domain: string,
  //   nomer: string,
  //   updateChapterDto: UpdateChapterDto,
  // ): Promise<void> {
  //   const chapter = await this.findOne(ranobeId, domain, nomer);
  //   if (!chapter) {
  //     throw ChaptersHttpException.NotFound();
  //   }
  //
  //   const chapterExtracted = await this.scraperService.extractChapter(
  //     chapter.source,
  //   );
  //   if (!chapterExtracted || !chapterExtracted.isCorrect()) {
  //     throw ChaptersHttpException.NotAcceptable();
  //   }
  //
  //   await this.chaptersRepository.update(chapter.id, {
  //     ...chapterExtracted,
  //     source: chapter.source,
  //   });
  // }

  async remove(ranobeId: string, domain: string, nomer: string): Promise<void> {
    const chapter = await this.findOne(ranobeId, domain, nomer)
    if (!chapter) {
      throw ChaptersHttpException.NotFound()
    }

    await this.chaptersRepository.remove(chapter.id)
  }
}
