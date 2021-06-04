import cheerio from 'cheerio';
import {
  RanobeInfo,
  Chapter,
  getFromStaticSrc,
  cheerioCleanClass,
} from './utils.js';

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
  const bodySelection = $(selector)
    .remove($(selector).find('script').parent())
    .parent();
  cheerioCleanClass(bodySelection[0]);
  //TODO deside about wrapping with div
  const body = $(bodySelection).html();
  // const body = $(bodySelection).find('div').html();

  //TODO image source extraction

  //TODO nomer of chapter extraction
  return new Chapter(title, body, 1);
};

const extractInfoRanobes = (url) => {
  return getFromStaticSrc(url, extractInfoRule);
};

const extractChapterRanobes = (url) => {
  return getFromStaticSrc(url, extractChapterRule);
};

export { extractInfoRanobes, extractChapterRanobes };
