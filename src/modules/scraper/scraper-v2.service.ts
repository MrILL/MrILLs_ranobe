import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Builder } from 'selenium-webdriver'
import { Options, ServiceBuilder } from 'selenium-webdriver/chrome'

import { ScraperRequestDto } from './dto/scraper-request.dto'

@Injectable()
export class ScraperServiceV2 {
  private readonly logger = new Logger(ScraperServiceV2.name)

  //TODO move to separate module
  private webdriver

  constructor(private readonly configService: ConfigService) {
    new Builder()
      .disableEnvironmentOverrides()
      .forBrowser('chrome')
      .setChromeService(
        new ServiceBuilder(this.configService.get('CHROME_WEBDRIVER_PATH'))
      )
      .setChromeOptions(
        new Options()
          .headless()
          .addArguments(
            'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
          )
      )
      .build()
      .then((driver) => {
        this.webdriver = driver
      })
  }

  async scrape(scraperRequestDto: ScraperRequestDto) {
    await this.webdriver.get(scraperRequestDto.url)

    const title = await this.webdriver.getTitle()

    //TODO
    // 1. Check if domain is supported

    // 2. Check if page is supported (for example: it's not a catalog or
    //    main page but a info, chapter or list of chapters)
    // 3. Scrape page using preexisted modules (ranobes, chapters,
    //    ranobe-domains)

    this.logger.log(`Scraping page: ${title}`)

    return 'Here must be craping of ' + scraperRequestDto.url
  }
}
