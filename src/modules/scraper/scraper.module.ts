import { Module, DynamicModule, Global } from '@nestjs/common'
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
      ],
      exports: [ScraperService],
    }
  }
}
