import Extractor from './Extractor.js';
import RanobesScraper from './ranobes.com.js';

const extractor = new Extractor();
extractor.register(new RanobesScraper());

export default extractor;
