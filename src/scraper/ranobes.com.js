import cheerio from 'cheerio';
import {
  RanobeInfo,
  Chapter,
  getFromStaticSrc,
  cheerioCleanClass,
} from './utils.js';

//TODO use img from src

const extractInfoRule = (info) => {
  const $ = cheerio.load(info);

  const titleSelector = $('.title');
  $($(titleSelector).find('span')).remove();
  const title = titleSelector.html();

  const first = 'https://ranobes.com' + $('.r-fullstory-btns a').attr('href');

  return new RanobeInfo(title, first);
};

const extractChapterRule = (chapter) => {
  const $ = cheerio.load(chapter);

  const title = $('h1', '#dle-content .block')
    .not($('h1', '#dle-content .block').children('*').remove())
    .text();

  const selector = $('.text#arrticle', '#dle-content .block').children('*');
  const res = $(selector).remove($(selector).find('script').parent()).parent();
  cheerioCleanClass(res[0]);

  //here img
  // console.log($(res).find('div').html());

  //TODO think are me need this <div> wrap | right now I don't think so
  return new Chapter(title, $(res).html()); //without wraping div tag
  // return new Chapter(title, cheerio.html(res)); //wraping with div tag
};

const extractInfoRanobes = (url) => {
  return getFromStaticSrc(url, extractInfoRule);
};

const extractChapterRanobes = (url) => {
  return getFromStaticSrc(url, extractChapterRule);
};

export { extractInfoRanobes, extractChapterRanobes };
