import validator from 'validator';
import db from '../db';
import extractor from '../scraper';
import ranobeModel from '../models/ranobeModel';
import chapterModel from '../models/chapterModel';
import ranobeInfoModel from '../models/ranobeInfoModel';

//TODO
const list = async (ctx, next) => {
  //here must be request to db with a list of ranobe
  // ctx.body = ;
  const getOne = 'SELECT * FROM ranobes';
  const res = db.query(getOne);
  console.log(await res);

  ctx.body = 'suck';
  next();
};

const addRanobeInfo = async (ctx, next) => {
  //TODO add auth
  const { title } = ctx.request.body;
  //no validation

  const res = await ranobeInfoModel.create({ title });

  ctx.response.body = res;
  ctx.status = 201;
};

const addRanobe = async (ctx, next) => {
  const { url } = ctx.request.body;
  const { ranobe } = ctx.params;
  const validation = validator.isURL(url);
  if (!validation) {
    ctx.throw(400);
    return;
  }

  const checkInfo = await ranobeInfoModel.getOneById({ id: ranobe });
  if (!checkInfo) {
    ctx.throw(404, 'Ranobe Not Found');
    return;
  }

  const domain = new URL(url).hostname;
  const checkDomain = await ranobeModel.getOneByDomain({
    ranobesInfoId: ranobe,
    domain,
  });
  if (checkDomain) {
    ctx.throw(409, 'Ranobe From This Domain Already Exists');
    return;
  }

  const res = await ranobeModel.create({ ranobesInfoId: ranobe, domain, url });

  //TODO add chapters //need scraper

  ctx.response.body = res;
  ctx.status = 201;

  return;
};

export { list, addRanobeInfo, addRanobe };
