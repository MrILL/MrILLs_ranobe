import RanobesController from './ranobes';
import RanobeDomainsController from './ranobeDomains';
import ChaptersController from './chapters';

class Controllers {
  constructor({ chaptersRepo, ranobeDomainsRepo, ranobesRepo }) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;

    const repos = { chaptersRepo, ranobeDomainsRepo, ranobesRepo };
    this.ranobes = new RanobesController(repos);
    this.ranobeDomains = new RanobeDomainsController(repos);
    this.chapters = new ChaptersController(repos);
  }
}

export default Controllers;
