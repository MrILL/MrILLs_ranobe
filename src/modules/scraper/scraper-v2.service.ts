import { Injectable, Logger, NotImplementedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { ScraperRequestDto } from './dto/scraper-request.dto'

@Injectable()
export class ScraperServiceV2 {
  private readonly logger = new Logger(ScraperServiceV2.name)

  constructor(private readonly configService: ConfigService) {}

  async scrape(scraperRequestDto: ScraperRequestDto) {
    throw new NotImplementedException()
  }
}
