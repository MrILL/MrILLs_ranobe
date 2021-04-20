import validator from 'validator';
import extractor from '../scraper';

class Controllers {
  constructor({ chaptersRepo, ranobeDomainsRepo, ranobesRepo }) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  addRanobe = async (ctx) => {
    //TODO add auth
    const { title } = ctx.request.body;
    //no validation

    const res = await this.ranobesRepo.create({ title });

    ctx.response.body = res;
    ctx.status = 201;
  };

  async addRanobeDomain(ctx) {
    const { url } = ctx.request.body;
    const { ranobe } = ctx.params;
    const validation = validator.isURL(url);
    if (!validation) {
      ctx.throw(400);
      return;
    }

    checkInfo = await this.ranobesRepo.getOneById({ id: ranobe });
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

    //TODO add chapters //need scraper

    ctx.response.body = res;
    ctx.status = 201;

    return;
  }
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
