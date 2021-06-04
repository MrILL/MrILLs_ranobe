export class RanobesController {
  constructor(ranobesRepo) {
    this.ranobesRepo = ranobesRepo;
  }

  //TODO add pagination
  get = async () => {
    return await this.ranobesRepo.get();
  };

  //TODO add auth
  add = async (title) => {
    return await this.ranobesRepo.create({ title });
  };

  update = async (id, title) => {
    const checkRanobe = await this.ranobesRepo.getOneById({ id });
    if (!checkRanobe) {
      throw 'Ranobe Not Found';
    }

    return await this.ranobesRepo.update({ ranobeId: id, title });
  };

  delete = async (id) => {
    const checkRanobe = await this.ranobesRepo.getOneById({ id });
    if (!checkRanobe) {
      throw 'Ranobe Not Found';
    }

    await this.ranobesRepo.delete({ ranobeId: ranobe });
  };
}

export default RanobesController;
