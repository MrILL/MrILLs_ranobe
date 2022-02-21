import { Injectable } from '@nestjs/common'
import { RanobeDomainsService } from 'ranobe-domains/ranobe-domains.service'
import { ScraperService } from 'scraper'
import { genBase64UID } from 'utils'
import { ChaptersHttpException } from './chapters.exceptions'
import { ChaptersRepository } from './chapters.repository'
import { CreateChapterDto, UpdateChapterDto } from './dto'
import { Chapter } from './chapter.entity'

@Injectable()
export class ChaptersService {
  constructor(
    private readonly chaptersRepository: ChaptersRepository,
    private readonly ranobeDomainsService: RanobeDomainsService,
    private readonly scraperService: ScraperService
  ) {}

  async create(
    ranobeId: string,
    createChapterDto: CreateChapterDto
  ): Promise<Partial<Chapter>> {
    const domain = this.scraperService.extractDomain(createChapterDto.source)
    const ranobeDomain = await this.ranobeDomainsService.findOne(
      ranobeId,
      domain
    )
    if (!ranobeDomain) {
      throw ChaptersHttpException.DomainNotFound()
    }

    //TODO inspect if wrong url or if not full data in return
    const chapter: any = await this.scraperService.extractChapter(
      createChapterDto.source
    )
    if (!chapter || !chapter.isCorrect()) {
      throw ChaptersHttpException.NotAcceptable()
    }

    const checkChapter = await this.chaptersRepository.findOne(
      ranobeDomain.id,
      chapter.nomer
    )
    if (checkChapter) {
      throw ChaptersHttpException.Conflict()
    }

    const res = await this.chaptersRepository.create(
      genBase64UID(7),
      ranobeDomain.id,
      { ...createChapterDto, ...chapter }
    )

    return res
  }

  async findAll(ranobeId: string, domain: string): Promise<Chapter[]> {
    let ranobeDomainId
    if (domain) {
      const checkRanobeDomain = await this.ranobeDomainsService.findOne(
        ranobeId,
        domain
      )
      if (!checkRanobeDomain) {
        // throw new RanobeNotFoundError; //TODO interception
        throw ChaptersHttpException.DomainNotFound()
      }

      ranobeDomainId = checkRanobeDomain.id
    } else {
      //TODO think about better way of default domain
      const ranobeDomains = await this.ranobeDomainsService.findAll(ranobeId)
      if (!ranobeDomains || ranobeDomains.length == 0) {
        throw ChaptersHttpException.DomainNotFound()
      }

      ranobeDomainId = ranobeDomains[0].id
    }

    const res = await this.chaptersRepository.findAll(ranobeDomainId)
    if (!res || res.length == 0) {
      throw ChaptersHttpException.NotFound()
    }

    return res
  }

  async findOne(
    ranobeId: string,
    domain: string,
    nomer: number
  ): Promise<Chapter> {
    let ranobeDomainId
    if (domain) {
      const ranobeDomain = await this.ranobeDomainsService.findOne(
        ranobeId,
        domain
      )
      if (!ranobeDomain) {
        throw ChaptersHttpException.DomainNotFound()
      }

      ranobeDomainId = ranobeDomain.id
    } else {
      const ranobeDomains = await this.ranobeDomainsService.findAll(ranobeId)
      if (!ranobeDomains || ranobeDomains.length == 0) {
        throw ChaptersHttpException.DomainNotFound()
      }

      ranobeDomainId = ranobeDomains[0].id
    }

    const res = await this.chaptersRepository.findOne(ranobeDomainId, nomer)
    if (!res) {
      throw ChaptersHttpException.NotFound()
    }

    return res
  }

  // async update(
  //   ranobeId: string,
  //   domain: string,
  //   nomer: number,
  //   updateChapterDto: UpdateChapterDto,
  // ): Promise<Chapter> {
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
  //   const res = await this.chaptersRepository.update(chapter.id, {
  //     ...chapterExtracted,
  //     source: chapter.source,
  //   });
  //   if (!res) {
  //     throw ChaptersHttpException.InternalServerError(
  //       'unable to update record',
  //     );
  //   }
  //
  //   return res;
  // }

  async remove(ranobeId: string, domain: string, nomer: number): Promise<void> {
    const chapter = await this.findOne(ranobeId, domain, nomer)
    if (!chapter) {
      throw ChaptersHttpException.NotFound()
    }

    const res = await this.chaptersRepository.remove(chapter.id)
    if (!res) {
      throw ChaptersHttpException.InternalServerError('unable to delete record')
    }
  }
}
