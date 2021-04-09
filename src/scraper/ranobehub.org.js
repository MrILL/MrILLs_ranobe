import cheerio from 'cheerio';
import {cheerioCleanEachClass} from './utils.js';

//TODO add downloading img

//TODO rewrite with jquery using as example ranobes.com.js
const extractPageRanobeHub = (data) => {
  const $ = cheerio.load(data);
  const selector = $('p, h1', '.__ranobe_read_container');
  cheerioCleanEachClass(selector);
  return cheerio.html(selector);
};

export default extractPageRanobeHub;
