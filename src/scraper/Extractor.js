//TODO inspect if wrong url or if not full data in return
class Extractor {
  constructor() {
    this.registered = {};
  }

  register(hostname, extractChapterFn, extractInfoFn) {
    if (this.registered[hostname]) {
      console.error(hostname, 'already registered');
      return;
    }
    this.registered[hostname] = { extractChapterFn, extractInfoFn };
  }

  extractInfo(url) {
    const hostname = new URL(url).hostname;
    const extracter = this.registered[hostname];
    if (!extracter) {
      console.error(url, 'have not registered hostname');
      return;
    }
    return extracter.extractInfoFn(url);
  }

  extractChapter(url) {
    const hostname = new URL(url).hostname;
    const extracter = this.registered[hostname];
    if (!extracter) {
      console.error(url, 'have not registered hostname');
      return;
    }
    return extracter.extractChapterFn(url);
  }
}

export default Extractor;
