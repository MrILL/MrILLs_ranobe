import cheerio from 'cheerio';
import { Scraper } from '../interfaces/scraper';
import { RanobeDomainData, Chapter } from '../entities';
import { getFromStaticSrc, cheerioCleanClass } from '../utils';

export class RanobesScraper implements Scraper {
  extractDomainInfoRule(page): RanobeDomainData {
    const $: any = cheerio.load(page);

    const titleSelector = $('.title');
    $($(titleSelector).find('span')).remove();
    const title = titleSelector.html();

    const firstChapterSrc =
      'https://ranobes.com' + $('.r-fullstory-btns a').attr('href');

    return new RanobeDomainData(title, firstChapterSrc);
  }

  extractChapterRule(page: string): Chapter {
    const $: any = cheerio.load(page);

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
  }

  getHostname = () => 'ranobes.com';

  async extractDomainInfo(url: string): Promise<RanobeDomainData> {
    return getFromStaticSrc(url, this.extractDomainInfoRule);
  }

  async extractChapter(url: string): Promise<Chapter> {
    return getFromStaticSrc(url, this.extractChapterRule);
  }
}
