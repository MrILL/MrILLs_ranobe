import Extractor from './Extractor.js';
import { extractChapterRanobes, extractInfoRanobes } from './ranobes.com.js';

const extractor = new Extractor();
extractor.register('ranobes.com', extractChapterRanobes, extractInfoRanobes);

export default extractor;
