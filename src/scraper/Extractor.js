//TODO inspect if wrong url or if not full data in return
//TODO change console.error to throw
class Extractor {
  constructor() {
    this.registered = {};
  }

  //TODO handle missing scrapings
  register(scraper) {
    const hostname = scraper.getHostname();
    if (this.registered[hostname]) {
      console.error(hostname, 'already registered');
      return;
    }

    this.registered[hostname] = scraper;
  }

  extractDomain(url) {
    return new URL(url).hostname;
  }

  extractInfo(url) {
    const hostname = new URL(url).hostname;
    const scraper = this.registered[hostname];
    if (!scraper) {
      console.error(url, 'have not registered hostname');
      return;
    }

    return scraper.extractInfo(url);
  }

  extractChapter(url) {
    const hostname = new URL(url).hostname;
    const scraper = this.registered[hostname];
    if (!scraper) {
      console.error(url, 'have not registered hostname');
      return;
    }

    return scraper.extractChapter(url);
  }
}

export default Extractor;
