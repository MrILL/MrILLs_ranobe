import { Module, DynamicModule, Global } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { RanobesScraper } from './domains';
import { SCRAPER_DOMAINS_OPTION } from './constants';

@Global()
@Module({})
export class ScraperModule {
  static forRoot(): DynamicModule {
    const defaultScrapers = [new RanobesScraper()];

    return {
      module: ScraperModule,
      providers: [
        {
          provide: SCRAPER_DOMAINS_OPTION,
          useValue: defaultScrapers,
        },
        ScraperService,
      ],
      exports: [ScraperService],
    };
  }
}
