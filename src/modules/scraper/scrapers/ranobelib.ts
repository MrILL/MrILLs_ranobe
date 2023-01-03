import { By, until, WebDriver } from 'selenium-webdriver'

import { ScraperOptions, ScraperV2 } from '../interfaces/scraper-v2'

export class RanobelibScraper implements ScraperV2 {
  private webdriver: WebDriver
  // constructor() {}
  setOptions(options: ScraperOptions) {
    this.webdriver = options.driver

    return this
  }

  getHostname() {
    return 'ranobelib.me'
  }

  /**
   * Note: info & chapter list is one the same page
   */
  isInfo(url: string) {
    const { pathname } = new URL(url)

    return /^\/[a-z\-]+$/.test(pathname)
  }

  async scrapeInfo(url: string) {
    if (!this.isInfo(url)) {
      throw new Error(`Not valid url for scraping info`)
    }

    await this.webdriver.get(url)
    await this.webdriver.wait(
      until.elementLocated(By.className('media-info-list'))
    )
    console.log(await this.webdriver.getTitle())

    throw new Error('Not implemented Ranobelib scrapeInfo')
    return ''
  }

  /**
   * Note: info & chapter list is one the same page
   */
  isChapterList(url: string) {
    const { pathname } = new URL(url)

    return /^\/[a-z\-]+$/.test(pathname)
  }

  async scrapeChapterList(url: string) {
    throw new Error('Not implemented Ranobelib scrapeChapterList')
    if (!this.isChapterList(url)) {
      throw new Error(`Not valid url for scraping chapter list`)
    }

    return ''
  }

  isChapter(url: string) {
    const { pathname } = new URL(url)

    return /^\/[a-z\-]+\/v[1-9]+\/c[1-9]*$/.test(pathname)
  }

  async scrapeChapter(url: string) {
    throw new Error('Not implemented Ranobelib scrapeChapter')
    if (!this.isChapter(url)) {
      throw new Error(`Not valid url for scraping chapter`)
    }

    return ''
  }
}
