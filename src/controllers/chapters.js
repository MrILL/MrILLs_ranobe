class ChaptersController {
  constructor({ chaptersRepo, ranobeDomainsRepo, ranobesRepo }) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }
}

export default ChaptersController;
