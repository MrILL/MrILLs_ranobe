import cheerio from 'cheerio';
import {Page, getFromStaticSrc, cheerioCleanClass} from './utils.js';

//TODO add downloading img

const extractRule = (page) => {
  const $ = cheerio.load(page);
  
  const title = $('h1', '#dle-content .block')
  .not($('h1', '#dle-content .block').children('*').remove()).text();

  const selector = $('.text#arrticle', '#dle-content .block')
    .children('*');
  const res = $(selector).remove($(selector)
    .find('script')
    .parent())
    .parent();
  cheerioCleanClass(res[0]);

  //here img
  // console.log($(res).find('div').html());

  return new Page(title, cheerio.html(res));
}

const extractPageRanobes = (url) => {
  return getFromStaticSrc(url, extractRule);
};

export default extractPageRanobes;
