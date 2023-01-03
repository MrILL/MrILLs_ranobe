import { Injectable, Logger, NotImplementedException } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'
import { ConfigService } from '@nestjs/config'
import { Builder, WebDriver } from 'selenium-webdriver'
import { Options, ServiceBuilder } from 'selenium-webdriver/chrome'

import { ScraperRequestDto } from './dto/scraper-request.dto'
import { ScraperV2 } from './interfaces'
import { UndetectedChromeWebDriver } from './lib'
import { RanobelibScraper } from './scrapers/ranobelib'

@Injectable()
export class ScraperServiceV2 {
  private readonly logger = new Logger(ScraperServiceV2.name)

  //TODO move to separate module
  private webdriver: WebDriver

  private scrapers: {
    [hostname: string]: ScraperV2
  } = {}

  private async _setupDriver({ webDriverPath }) {
    const driver = await UndetectedChromeWebDriver.getWebDriver({
      webDriverPath,
      isHeadless: false,
    })

    this.webdriver = driver

    const scraperClasses: ScraperV2[] = [new RanobelibScraper()]
    scraperClasses.forEach((scraper) => {
      scraper.setOptions({
        driver: this.webdriver,
      })

      this.scrapers[scraper.getHostname()] = scraper
    })
  }

  constructor(private readonly configService: ConfigService) {
    this._setupDriver({
      webDriverPath: this.configService.get('CHROME_WEBDRIVER_PATH'),
    })
  }

  async scrape(scraperRequestDto: ScraperRequestDto) {
    await this.webdriver.get(scraperRequestDto.url)

    const title = await this.webdriver.getTitle()

    //TODO
    // 1. Check if domain is supported
    const url = scraperRequestDto.url
    this.logger.log(`Checking url: ${url}`)

    const hostname = new URL(url).hostname
    this.logger.log(`Hostname of url: ${hostname}`)

    const scraper = this.scrapers[hostname]
    if (!scraper) {
      throw new NotImplementedException(
        `Not implemented scraping of ${hostname} domain`
      )
    }

    // 2. Check if page is supported (for example: it's not a catalog or
    //    main page but a info, chapter or list of chapters)

    let isPageScrapable = false
    if (scraper.isInfo(url)) {
      this.logger.log('Url lead to the info')
      const res = await scraper.scrapeInfo(url)
      console.log(res)

      isPageScrapable = true
    }
    // if (scraper.isChapterList(url)) {
    //   this.logger.log('Url lead to the chapters list')
    //   const res = await scraper.scrapeChapterList(url)
    //   console.log(res)

    //   isPageScrapable = true
    // }
    // if (scraper.isChapter(url)) {
    //   this.logger.log('Url lead to the chapter')
    //   const res = await scraper.scrapeChapter(url)
    //   console.log(res)

    //   isPageScrapable = true
    // }
    if (!isPageScrapable) {
      throw new BadRequestException('Not valid page for scraping')
    }

    // 3. Scrape page using preexisted modules (ranobes, chapters,
    //    ranobe-domains)

    this.logger.log(`Scraping page: ${title}`)

    return 'Here must be craping of ' + scraperRequestDto.url
  }
}
