import express from 'express';
import extractPageRanobes from './scraper/ranobes.com.js';
import fs from 'fs';

const testSrc = [
  'https://ranobes.com/chapters/solo-leveling-org/23557-tom-1-glava-1-ohotnik-ranga-e.html',
];

const src = testSrc[0];
const outputSrc = 'assets/';

class Extractor {
  constructor() {
    this.registered = [];
  }

  register(hostname, extractPageFn) {
    if(this.registered[hostname]) {
      console.log(hostname, 'already registered');
      return;
    }
    this.registered[hostname] = { extractPageFn };
  }

//if db have no this page, than it's begin extraction of page
  extractPage(url) {
    const hostname = new URL(url).hostname;
    const extracter = this.registered[hostname];
    if (!extracter) {
      console.log(url, 'have not registered hostname');
      return;
    }
    return extracter.extractPageFn(url);
  }
}

const extractor = new Extractor();
extractor.register('ranobes.com', extractPageRanobes)

const page = await extractor.extractPage(src);

//here should be db writing
fs.writeFile(outputSrc + page.title + '.html', page.body, err => {
  if (err) console.log(err);
})


const app = express();
const port = 8000;

//routes
app.get('/ranobe', (req, res) => {
  res.send('succ');
})


app.listen(port, () => {
  console.log('We are live on ' + port);
})
