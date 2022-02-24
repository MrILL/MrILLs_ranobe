import { RanobesScraper } from './domains'
import { ScraperService } from './scraper.service'

const source =
  'https://ranobehub.org/ranobe/929-fake-marriage-with-my-ex-girlfriend'

// import * as cloudflareScraper from 'cloudflare-scraper';
// (async () => {
//   try {
//     const response = await cloudflareScraper.get(source);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// const options = {
//   cloudflareScraper: {
//     host: 'localhost.com',
//     port: '5000',
//     path: '/scraper',
//   },
// };
// const url =
//   'https://ranobes.com/chapters/solo-leveling-org/23557-tom-1-glava-1-ohotnik-ranga-e.html';

// import * as https from 'https';
// import axios from 'axios';
// import * as qs from 'qs';
// // console.log(qs);

// (async () => {
//   await axios({
//     method: 'post',
//     url: 'https://localhost:5000/scrape',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     data: {
//       url: url,
//     },
//   })
//     .then((res) => {
//       console.log(res.status);
//       console.log(res);
//     })
//     .catch(() => {
//       console.log('FUCK');
//     });

//   // console.log(res.data);
//   // console.log(res.status);
// })();

import * as request from 'request'
const options = {
  method: 'POST',
  url: 'http://localhost:5000/scrape',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  form: {
    url: 'https://ranobes.com/chapters/solo-leveling-org/23557-tom-1-glava-1-ohotnik-ranga-e.html',
  },
}
request(options, function (error, response) {
  if (error) throw new Error(error)
  console.log(response.body)
})
