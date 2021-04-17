import validator from 'validator';
import db from '../db';
import extractor from '../scraper';
import ranobeModel from '../models/ranobeModel';
import chapterModel from '../models/chapterModel';

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

const addRanobe = async (ctx, next) => {
  const { url } = ctx.request.body;
  const validation = validator.isURL(url);
  if (!validation) {
    ctx.throw(400);
    return;
  }

  const checkExist = await ranobeModel.getOneByUrl(url);
  if (checkExist.rows.length > 0) {
    ctx.response.body = checkExist.rows[0];
    ctx.status = 200;
    return;
  }

  const info = await extractor.extractInfo(url);
  if (!info) {
    ctx.throw(404, 'Ranobe Not Found');
    return;
  }

  const firstChapter = await extractor.extractChapter(info.firstChapterSrc);
  if (!firstChapter) {
    console.log('no first chapter');
    ctx.throw(406, 'Empty Ranobe Not Acceptable');
    return;
  }

  const insertedRanobe = await ranobeModel.create({ title: info.title, url });
  const insertedRanobeID = insertedRanobe.rows[0].id;

  const insertedChapter = await chapterModel.create({
    id: insertedRanobeID,
    title: firstChapter.title,
    body: firstChapter.body,
  });
  const insertedChapterID = insertedChapter.rows[0].id;

  const res = await ranobeModel.updateChapters({
    ranobeID: insertedRanobeID,
    chapterFirstID: insertedChapterID,
    chapterLastID: insertedChapterID,
  });

  ctx.response.body = res.rows[0];
  ctx.status = 201;
};

export { list, addRanobe };
