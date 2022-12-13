import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'

import { ScraperServiceV2 } from './scraper-v2.service'
import { ScraperRequestDto } from './dto/scraper-request.dto'
// import { Ranobe } from './scraper.entity'

@Controller({
  path: 'scraper',
  version: '2',
})
export class ScraperControllerV2 {
  constructor(private readonly scraperServiceV2: ScraperServiceV2) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async scrape(@Body() scraperRequestDto: ScraperRequestDto): Promise<any> {
    return this.scraperServiceV2.scrape(scraperRequestDto)
  }
}
