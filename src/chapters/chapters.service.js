import { HttpException } from '../utils';
import extractor from '../scraper';

export class ChaptersService {
  constructor(ranobesRepo, ranobeDomainsRepo, chaptersRepo) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  create = async (ranobeId, domain, url) => {
    const ranobeDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!ranobeDomain) {
      throw new HttpException(404, 'Ranobe From This Domain Not Found');
    }

    //TODO inspect if wrong url or if not full data in return
    const chapter = await extractor.extractChapter(url);
    if (!chapter || !chapter.isCorrect()) {
      throw new HttpException(406, 'Cant extract chapter');
    }

    const checkChapter = await this.chaptersRepo.getOne({
      ranobeDomainId: ranobeDomain.id,
      nomer: chapter.nomer,
    });
    if (checkChapter) {
      throw new HttpException(409, 'Chapter In This Domain Already Exists');
    }

    const res = await this.chaptersRepo.create({
      ranobeDomainId: ranobeDomain.id,
      title: chapter.title,
      body: chapter.body,
      nomer: chapter.nomer,
      source: url,
    });

    return res;
  };

  get = async (ranobeId, domain) => {
    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!checkDomain) {
      throw new HttpException(404, 'Ranobe From This Domain Not Found');
    }

    const res = await this.chaptersRepo.get({
      ranobeDomainId: checkDomain.id,
    });
    if (!res || res.length == 0) {
      throw new HttpException(404, 'Chapters In This Domain Not Found');
    }

    return res;
  };

  getOne = async (ranobeId, domain, chapterNomer) => {
    const ranobeDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!ranobeDomain) {
      throw new HttpException(404, 'Ranobe From This Domain Not Found');
    }

    const res = await this.chaptersRepo.getOne({
      ranobeDomainId: ranobeDomain.id,
      nomer: chapterNomer,
    });
    if (!res) {
      throw new HttpException(404, 'Chapter Not Found');
    }

    return res;
  };

  update = async (ranobeId, domain, chapterNomer) => {
    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!checkDomain) {
      throw new HttpException(404, 'Ranobe From This Domain Not Found');
    }

    const chapter = await this.chaptersRepo.getOne({
      ranobeDomainId: checkDomain.id,
      nomer: chapterNomer,
    });
    if (!chapter) {
      throw new HttpException(404, 'Chapter Not Found');
    }

    const chapterExtracted = await extractor.extractChapter(chapter.source);
    if (!chapterExtracted || !chapterExtracted.isCorrect()) {
      throw new HttpException(406, 'Cant extract chapter');
    }

    //TODO consider about checking
    const res = await this.chaptersRepo.update({
      chapterId: chapter.id,
      title: chapterExtracted.title,
      body: chapterExtracted.body,
      source: chapter.source,
    });

    return res;
  };

  //TODO check how to handle delete error
  delete = async (ranobeId, domain, chapterNomer) => {
    const checkRanobe = await this.ranobesRepo.getOneById({ id: ranobeId });
    if (!checkRanobe) {
      throw new HttpException(404, 'Ranobe Not Found');
    }

    const ranobeDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!ranobeDomain) {
      throw new HttpException(404, 'Ranobe From This Domain Not Found');
    }

    const chapter = await this.chaptersRepo.getOne({
      ranobeDomainId: ranobeDomain.id,
      nomer: chapterNomer,
    });
    if (!chapter) {
      throw new HttpException(404, 'Chapter Not Found');
    }

    await this.chaptersRepo.delete({ chapterId: chapter.id });
  };
}
