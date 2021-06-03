class RanobeDomainsController {
  constructor({ chaptersRepo, ranobeDomainsRepo, ranobesRepo }) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  getRanobeDomain = async (ctx) => {
    //TODO
  };

  addRanobeDomain = async (ctx) => {
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

    const checkInfo = await this.ranobesRepo.getOneById({ id: ranobe });
    if (!checkInfo) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    const domain = new URL(url).hostname;
    const checkDomain = await this.ranobeDomainsRepo.getOneByDomain({
      ranobeId: ranobe,
      domain,
    });
    if (checkDomain) {
      ctx.throw(409, 'Ranobe From This Domain Already Exists');
      return;
    }

    const res = await this.ranobeDomainsRepo.create({
      ranobeId: ranobe,
      domain,
      url,
    });

    //TODO add info via scraping
    //TODO add chapters via scraping

    ctx.response.body = res;
    ctx.status = 201;

    return;
  };
}

export default RanobeDomainsController;
