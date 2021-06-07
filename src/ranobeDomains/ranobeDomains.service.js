import { HttpException } from '../utils';

export class RanobeDomainsService {
  constructor(ranobeDomainsRepo, ranobesRepo) {
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  create = async (ranobeId, url) => {
    const checkRanobe = await this.ranobesRepo.getOneById({ id: ranobeId });
    if (!checkRanobe) {
      throw new HttpException(404, 'Ranobe Not Found');
    }

    const domain = new URL(url).hostname;
    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (checkDomain) {
      throw new HttpException(409, 'Ranobe With This Domain Already Exists');
    }

    //TODO add info via scraping

    const res = await this.ranobeDomainsRepo.create({
      ranobeId,
      domain,
      url,
    });

    //TODO add chapters via scraping

    return res;
  };

  get = async (ranobeId) => {
    const res = await this.ranobeDomainsRepo.get({ ranobeId });
    if (!res || res.length == 0) {
      throw new HttpException(404, 'Ranobe Domains Not Found');
    }

    return res;
  };

  getOne = async (ranobeId, domain) => {
    const res = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!res) {
      throw new HttpException(404, 'Ranobe With This Domain Not Found');
    }

    return res;
  };

  //pass only object and some essential not scrapped data
  //UPD: nothing to update yet
  update = async (ranobeId, domain) => {
    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!checkDomain) {
      throw new HttpException(404, 'Ranobe With This Domain Not Found');
    }

    //TODO update info via scraping using source from checkDomain obj

    const res = await this.ranobeDomainsRepo.update({
      ranobeId,
      domain,
      url: checkDomain.source,
    });

    return res;
  };

  //TODO check how to handle delete error
  delete = async (ranobeId, domain) => {
    const checkDomain = await this.ranobeDomainsRepo.getOne({
      ranobeId,
      domain,
    });
    if (!checkDomain) {
      throw new HttpException(404, 'Ranobe With This Domain Not Found');
    }

    await this.ranobeDomainsRepo.delete({
      ranobeId,
      domain,
    });
    return true;
  };
}
