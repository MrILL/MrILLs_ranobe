import validator from 'validator';
import extractor from '../scraper';

class Controllers {
  constructor({ chaptersRepo, ranobeDomainsRepo, ranobesRepo }) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  //TODO add pagination
  listRanobesInfo = async (ctx) => {
    const res = await this.ranobesRepo.get();
    if (!res) {
      ctx.throw(404, 'RanobesInfo Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 201;

    return;
  };

  addRanobe = async (ctx) => {
    //TODO add auth
    const { title } = ctx.request.body;

    const res = await this.ranobesRepo.create({ title });

    ctx.response.body = res;
    ctx.status = 201;
  };

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
      ranobesInfoId: ranobe,
      domain,
    });
    if (checkDomain) {
      ctx.throw(409, 'Ranobe From This Domain Already Exists');
      return;
    }

    const res = await this.ranobeDomainsRepo.create({
      ranobesInfoId: ranobe,
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

//TODO
// const list = async (ctx, next) => {
//   //here must be request to db with a list of ranobe
//   // ctx.body = ;
//   const getOne = 'SELECT * FROM ranobes';
//   const res = db.query(getOne);
//   console.log(await res);

//   ctx.body = 'suck';
//   next();
// };

export default Controllers;
