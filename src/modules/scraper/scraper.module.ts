import { Module, DynamicModule, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ScraperControllerV2 } from './scraper-v2.controller'
import { ScraperServiceV2 } from './scraper-v2.service'
import { ScraperService } from './scraper.service'
import { RanobesScraper } from './domains'
import { SCRAPER_DOMAINS_OPTION, SCRAPERS_OPTIONS } from './constants'

@Global()
@Module({})
export class ScraperModule {
  static forRoot(): DynamicModule {
    const options = {
      cloudflareScraper: {
        url: 'http://localhost:5000',
      },
    }

    const defaultScrapers = [new RanobesScraper()]

    return {
      module: ScraperModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: SCRAPER_DOMAINS_OPTION,
          useValue: defaultScrapers,
        },
        {
          provide: SCRAPERS_OPTIONS,
          useValue: options,
        },
        ScraperService,
        // ScraperServiceV2,
      ],
      // controllers: [ScraperControllerV2],
      exports: [ScraperService],
    }
  }
}
