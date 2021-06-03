import validator from 'validator';

class RanobeDomainsController {
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
      params: { ranobe },
    } = ctx;

    const validation = validator.isURL(url);
    if (!validation) {
      ctx.throw(400);
      return;
    }

    const checkRanobe = await this.ranobesRepo.getOneById({ id: ranobe });
    if (!checkRanobe) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    const domain = new URL(url).hostname;
    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain,
    });
    if (checkDomain) {
      ctx.throw(409, 'Ranobe With This Domain Already Exists');
      return;
    }

    //TODO add info via scraping

    const res = await this.ranobeDomainsRepo.create({
      ranobeId: ranobe,
      domain,
      url,
    });

    //TODO add chapters via scraping

    ctx.response.body = res;
    ctx.status = 201;
  };

  get = async (ctx) => {
    const {
      params: { ranobe },
    } = ctx;

    const res = await this.ranobeDomainsRepo.get({ ranobeId: ranobe });
    if (!res || res.length == 0) {
      ctx.throw(404, 'Ranobe Domains Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  getOne = async (ctx) => {
    const {
      params: { ranobe, domain },
    } = ctx;

    const res = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain,
    });
    if (!res) {
      ctx.throw(404, 'Ranobe With This Domain Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  //pass only object and some essential not scrapped data
  //UPD: nothing to update yet
  update = async (ctx) => {
    const {
      params: { ranobe, domain },
    } = ctx;

    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain,
    });
    if (!checkDomain) {
      ctx.throw(404, 'Ranobe With This Domain Not Found');
      return;
    }

    //TODO update info via scraping using source from checkDomain obj

    const res = await this.ranobeDomainsRepo.update({
      ranobeId: ranobe,
      domain,
      url: checkDomain.source,
    });

    ctx.response.body = res;
    ctx.status = 200;
  };

  delete = async (ctx) => {
    const {
      params: { ranobe, domain },
    } = ctx;

    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId: ranobe,
      domain,
    });
    if (!checkDomain) {
      ctx.throw(404, 'Ranobe With This Domain Not Found');
      return;
    }

    await this.ranobeDomainsRepo.delete({
      ranobeId: ranobe,
      domain,
    });
    ctx.response.body = checkDomain;
    ctx.status = 200;
  };
}

export default RanobeDomainsController;
