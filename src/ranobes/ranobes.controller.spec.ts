import { Test, TestingModule } from '@nestjs/testing';
import { RanobesController } from './ranobes.controller';
import { RanobesService } from './ranobes.service';

describe('RanobesController', () => {
  let controller: RanobesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RanobesController],
      providers: [RanobesService],
    }).compile();

    controller = module.get<RanobesController>(RanobesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
