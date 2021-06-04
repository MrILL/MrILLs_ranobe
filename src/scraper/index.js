import Extractor from './Extractor.js';
import { extractChapterRanobes, extractInfoRanobes } from './ranobes.com.js';

//TODO clean
// const testSrc = [
//   'https://ranobes.com/chapters/solo-leveling-org/23557-tom-1-glava-1-ohotnik-ranga-e.html',
//   'https://ranobes.com/ranobe/20314-solo-leveling.html',
//   'https://ranobehub.org/ranobe/351-eighth-son-i-dont-think-so',
//   'https://ranobes.com/ranobe/68-against-the-gods.html',
// ];

// const src = testSrc[0];
// const outputSrc = 'assets/';

const extractor = new Extractor();
extractor.register('ranobes.com', extractChapterRanobes, extractInfoRanobes);

// const info = await extractor.extractInfo(testSrc[1]);
// console.log(info);
// extractor.extractInfo(testSrc[1]).then((v) => console.log(v));

// const chapter = await extractor.extractChapter(src);
// console.log(chapter);
// extractor.extractChapter(testSrc[0]).then((v) => console.log(v));

export default extractor;
