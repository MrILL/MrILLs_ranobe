import { HttpException } from '../utils';

export class RanobesService {
  constructor(ranobesRepo) {
    this.ranobesRepo = ranobesRepo;
  }

  //TODO add pagination
  get = async () => {
    const res = await this.ranobesRepo.get();
    if (!res || res.length == 0) {
      throw new HttpException(404, 'Ranobes Not Found');
    }

    return res;
  };

  //TODO add auth
  add = async (title) => {
    return await this.ranobesRepo.create({ title });
  };

  update = async (id, title) => {
    const checkRanobe = await this.ranobesRepo.getOneById({ id });
    if (!checkRanobe) {
      throw new HttpException(404, 'Ranobe Not Found');
    }

    return await this.ranobesRepo.update({ ranobeId: id, title });
  };

  //TODO check how to handle delete error
  delete = async (id) => {
    const checkRanobe = await this.ranobesRepo.getOneById({ id });
    if (!checkRanobe) {
      throw new HttpException(404, 'Ranobe Not Found');
    }

    const res = await this.ranobesRepo.delete({ ranobeId: id });
    if (!res) {
      throw new HttpException(500, 'unable to delete record');
    }
  };
}
