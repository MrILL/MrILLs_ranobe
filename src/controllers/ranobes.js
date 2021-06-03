class RanobesController {
  constructor({ chaptersRepo, ranobeDomainsRepo, ranobesRepo }) {
    this.chaptersRepo = chaptersRepo;
    this.ranobeDomainsRepo = ranobeDomainsRepo;
    this.ranobesRepo = ranobesRepo;
  }

  //TODO add pagination
  get = async (ctx) => {
    const res = await this.ranobesRepo.get();
    if (!res) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    ctx.response.body = res;
    ctx.status = 200;
  };

  add = async (ctx) => {
    //TODO add auth
    const { title } = ctx.request.body;

    const res = await this.ranobesRepo.create({ title });

    ctx.response.body = res;
    ctx.status = 201;
  };

  update = async (ctx) => {
    const {
      request: {
        body: { title },
      },
      params: { ranobe },
    } = ctx;

    const checkRanobe = await this.ranobesRepo.getOneById({ id: ranobe });
    if (!checkRanobe) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    const res = await this.ranobesRepo.update({ ranobeId: ranobe, title });

    ctx.response.body = res;
    ctx.status = 201;
  };

  delete = async (ctx) => {
    const {
      params: { ranobe },
    } = ctx;

    const checkRanobe = await this.ranobesRepo.getOneById({ id: ranobe });
    if (!checkRanobe) {
      ctx.throw(404, 'Ranobe Not Found');
      return;
    }

    const res = await this.ranobesRepo.delete({ ranobeId: ranobe });
    ctx.response.body = checkRanobe;
    ctx.status = 200;
  };
}

export default RanobesController;
