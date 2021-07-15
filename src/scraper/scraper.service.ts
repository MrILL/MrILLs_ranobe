import { Inject, Injectable } from '@nestjs/common';
import { SCRAPER_DOMAINS_OPTION, SCRAPERS_OPTIONS } from './constants';
import { Scraper } from './interfaces';

//TODO inspect if wrong url or if not full data in return
//TODO change console.error to throw
@Injectable()
export class ScraperService {
  private scrapers: Map<string, Scraper>;

  constructor(
    @Inject(SCRAPER_DOMAINS_OPTION) scrapers: Scraper[],
    @Inject(SCRAPERS_OPTIONS) options,
  ) {
    this.scrapers = new Map<string, Scraper>();

    scrapers.forEach((scraper) => {
      this.scrapers.set(scraper.getHostname(), scraper);
    });

    if (options) {
      this.scrapers.forEach((scraper) => {
        scraper.setOptions(options);
      });
    }
  }

  register(scraper: Scraper) {
    const hostname = scraper.getHostname();
    if (this.scrapers.get(hostname)) {
      console.error(hostname, 'already registered');
      return;
    }

    this.scrapers.set(hostname, scraper);
  }

  extractDomain(url) {
    //add validation url
    return new URL(url).hostname;
  }

  extractDomainInfo(url) {
    const hostname = new URL(url).hostname;
    const scraper = this.scrapers.get(hostname);
    if (!scraper) {
      console.error(url, 'have not registered hostname');
      return;
    }

    return scraper.extractDomainInfo(url);
  }

  extractChapter(url: string): Promise<any> {
    const hostname = new URL(url).hostname;
    const scraper = this.scrapers.get(hostname);
    if (!scraper) {
      console.error(url, 'have not registered hostname');
      return;
    }

    return scraper.extractChapter(url);
  }
}
