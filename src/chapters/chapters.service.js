import { HttpException } from '../utils';
import extractor from '../scraper';

export class ChaptersService {
  constructor(ranobesRepo, ranobeDomainsRepo, chaptersRepo) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  create = async (ranobeId, url) => {
    const domain = extractor.extractDomain(url);
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
    let ranobeDomainId;
    if (domain) {
      const checkRanobeDomain = await this.ranobeDomainsRepo.getOne({
        ranobeId,
        domain,
      });
      if (!checkRanobeDomain) {
        // throw new RanobeNotFoundError; //TODO interception
        throw new HttpException(404, 'Ranobe From This Domain Not Found');
      }

      ranobeDomainId = checkRanobeDomain.id;
    } else {
      const ranobeDomains = await this.ranobeDomainsRepo.get({ ranobeId });
      if (!ranobeDomains || ranobeDomains.length == 0) {
        throw new HttpException(404, 'Ranobe From This Domain Not Found');
      }

      ranobeDomainId = ranobeDomains[0].id;
    }

    const res = await this.chaptersRepo.get({
      ranobeDomainId,
    });
    if (!res || res.length == 0) {
      throw new HttpException(404, 'Chapters In This Domain Not Found');
    }

    return res;
  };

  getOne = async (ranobeId, domain, chapterNomer) => {
    let ranobeDomainId;
    if (domain) {
      const ranobeDomain = await this.ranobeDomainsRepo.getOne({
        ranobeId,
        domain,
      });
      if (!ranobeDomain) {
        throw new HttpException(404, 'Ranobe From This Domain Not Found');
      }

      ranobeDomainId = ranobeDomain.id;
    } else {
      const ranobeDomains = await this.ranobeDomainsRepo.get({ ranobeId });
      if (!ranobeDomains || ranobeDomains.length == 0) {
        throw new HttpException(404, 'Ranobe From This Domain Not Found');
      }

      ranobeDomainId = ranobeDomains[0].id;
    }

    const res = await this.chaptersRepo.getOne({
      ranobeDomainId,
      nomer: chapterNomer,
    });
    if (!res) {
      throw new HttpException(404, 'Chapter Not Found');
    }

    return res;
  };

  //TODO use getOne
  update = async (ranobeId, domain, chapterNomer) => {
    //TODO deside about checking it because of it checking inside getOne
    const chapter = await this.getOne(ranobeId, domain, chapterNomer);

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

  //TODO use getOne
  //TODO check how to handle delete error
  delete = async (ranobeId, domain, chapterNomer) => {
    //TODO deside about checking it because of it checking inside getOne
    const chapter = await this.getOne(ranobeId, domain, chapterNomer);

    await this.chaptersRepo.delete({ chapterId: chapter.id });
  };

  //TODO getOneDomain(domain) return (domain)? db(domain) : db.getDefaultDomain
}
