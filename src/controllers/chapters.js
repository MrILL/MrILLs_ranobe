import validator from 'validator';
import extractor from '../scraper';

class ChaptersController {
  constructor({ chaptersRepo, ranobeDomainsRepo, ranobesRepo }) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  create = async (ctx) => {
    const {
      request: {
        body: { url },
      },
      params: { ranobe, domain },
    } = ctx;

    const validation = validator.isURL(url);
    if (!validation) {
      ctx.throw(400);
      return;
    }

    const ranobeDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain: domain,
    });
    if (!ranobeDomain) {
      ctx.throw(404, 'Ranobe From This Domain Not Found');
      return;
    }

    //TODO inspect if wrong url or if not full data in return
    const chapter = await extractor.extractChapter(url);
    if (!chapter || !chapter.isCorrect()) {
      ctx.throw(406, 'Cant extract chapter');
      return;
    }

    const checkChapter = await this.chaptersRepo.getOne({
      ranobeDomainId: ranobeDomain.id,
      nomer: chapter.nomer,
    });
    if (checkChapter) {
      ctx.throw(409, 'Chapter In This Domain Already Exists');
      return;
    }

    const res = await this.chaptersRepo.create({
      ranobeDomainId: ranobeDomain.id,
      title: chapter.title,
      body: chapter.body,
      nomer: chapter.nomer,
      source: url,
    });

    ctx.response.body = res;
    ctx.status = 201;
  };

  get = async (ctx) => {
    const {
      params: { ranobe, domain },
    } = ctx;

    const ranobeDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain: domain,
    });
    if (!ranobeDomain) {
      ctx.throw(404, 'Ranobe From This Domain Not Found');
      return;
    }

    const res = await this.chaptersRepo.get({
      ranobeDomainId: ranobeDomain.id,
    });
    if (!res || res.length == 0) {
      ctx.throw(404, 'Chapters In This Domain Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  getOne = async (ctx) => {
    const {
      params: { ranobe, domain, chapter },
    } = ctx;

    const ranobeDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain: domain,
    });
    if (!ranobeDomain) {
      ctx.throw(404, 'Ranobe From This Domain Not Found');
      return;
    }

    const res = await this.chaptersRepo.getOne({
      ranobeDomainId: ranobeDomain.id,
      nomer: chapter,
    });
    if (!res) {
      ctx.throw(404, 'Chapter Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  update = async (ctx) => {
    const {
      params: { ranobe, domain, chapter },
    } = ctx;

    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain: domain,
    });
    if (!checkDomain) {
      ctx.throw(404, 'Ranobe From This Domain Not Found');
      return;
    }

    const chapter = await this.chaptersRepo.getOne({
      ranobeDomainId: checkDomain.id,
      nomer: chapter,
    });
    if (!chapter) {
      ctx.throw(404, 'Chapter Not Found');
      return;
    }

    const chapterExtracted = await extractor.extractChapter(chapter.source);
    if (!chapterExtracted || !chapterExtracted.isCorrect()) {
      ctx.throw(406, 'Cant extract chapter');
      return;
    }

    const res = await this.chaptersRepo.update({
      chapterId: chapter.id,
      title: chapterExtracted.title,
      body: chapterExtracted.body,
      source: chapter.source,
    });

    ctx.response.body = res;
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const {
      params: { ranobe, domain, chapter },
    } = ctx;

    const checkRanobe = await this.ranobesRepo.getOneById({ id: ranobe });
    if (!checkRanobe) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    const ranobeDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain: domain,
    });
    if (!ranobeDomain) {
      ctx.throw(404, 'Ranobe From This Domain Not Found');
      return;
    }

    const chapter = await this.chaptersRepo.getOne({
      ranobeDomainId: ranobeDomain.id,
      nomer: chapter,
    });
    if (!chapter) {
      ctx.throw(404, 'Chapter Not Found');
      return;
    }

    await this.chaptersRepo.delete({ chapterId: chapter.id });
    ctx.response.body = chapter;
    ctx.status = 200;
  };
}

export default ChaptersController;
