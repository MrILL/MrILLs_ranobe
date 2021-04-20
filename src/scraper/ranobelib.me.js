//NOT WORK!
//here i suppose wwe need to use papeter
import cheerio from 'cheerio';
import { cheerioCleanEachClass } from './utils.js';

//TODO add downloading img

const extractChapterRanobeLib = (data) => {
  // return data;
  const $ = cheerio.load(data);
  const selector = $('body');
  cheerioCleanEachClass(selector);
  const content = cheerio.html(selector);
  return content;
};

export default extractChapterRanobeLib;
