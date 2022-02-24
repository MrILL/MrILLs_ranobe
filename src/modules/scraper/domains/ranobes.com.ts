import * as request from 'request'
import cheerio from 'cheerio'
import { Scraper } from '../interfaces/scraper'
import { RanobeDomainData, Chapter } from '../entities'
import { cheerioCleanClass } from '../utils'

export class RanobesScraper implements Scraper {
  private cloudflareScraper

  setOptions(options): void {
    const { cloudflareScraper } = options
    if (!cloudflareScraper) {
      throw 'ranobes.com: cant find cloudflareScraper'
    }

    this.cloudflareScraper = cloudflareScraper
  }

  extractDomainInfoRule(page): RanobeDomainData {
    const $: any = cheerio.load(page)

    const titleSelector = $('.title')
    $($(titleSelector).find('span')).remove()
    const title = titleSelector.html()

    const firstChapterSrc =
      'https://ranobes.com' + $('.r-fullstory-btns a').attr('href')

    return new RanobeDomainData(title, firstChapterSrc)
  }

  extractChapterRule(page): Chapter {
    const $: any = cheerio.load(page)

    const title = $('h1', '#dle-content .block')
      .not($('h1', '#dle-content .block').children('*').remove())
      .text()

    const selector = $('.text#arrticle', '#dle-content .block').children('*')
    const bodySelection = $(selector)
      .remove($(selector).find('script').parent())
      .parent()
    cheerioCleanClass(bodySelection[0])
    //TODO deside about wrapping with div
    const body = $(bodySelection).html()
    // const body = $(bodySelection).find('div').html();

    //TODO image source extraction

    //TODO nomer of chapter extraction
    return new Chapter(title, body, 1)
  }

  getHostname = () => 'ranobes.com'

  async extractPage(url: string): Promise<any> {
    const options = {
      method: 'POST',
      url: this.cloudflareScraper.url + '/scrape',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        url,
      },
    }

    return new Promise((resolve, reject) => {
      request(options, (error, response, data) => {
        if (error) {
          reject(error)
        } else {
          const obj = JSON.parse(data)
          resolve(obj.page)
        }
      })
    })
  }

  async extractDomainInfo(url: string): Promise<RanobeDomainData> {
    const page = await this.extractPage(url)

    return this.extractDomainInfoRule(page)
  }

  async extractChapter(url: string): Promise<Chapter> {
    let page
    try {
      page = await this.extractPage(url)
    } catch (err) {
      console.error(err)
      throw err
    }

    return this.extractChapterRule(page)
  }
}
