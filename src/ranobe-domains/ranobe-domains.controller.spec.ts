import { Test, TestingModule } from '@nestjs/testing';
import { RanobeDomainsController } from './ranobe-domains.controller';
import { RanobeDomainsService } from './ranobe-domains.service';

describe('RanobeDomainsController', () => {
  let controller: RanobeDomainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RanobeDomainsController],
      providers: [RanobeDomainsService],
    }).compile();

    controller = module.get<RanobeDomainsController>(RanobeDomainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
