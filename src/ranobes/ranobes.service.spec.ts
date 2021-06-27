import { Test, TestingModule } from '@nestjs/testing';
import { RanobesService } from './ranobes.service';

describe('RanobesService', () => {
  let service: RanobesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RanobesService],
    }).compile();

    service = module.get<RanobesService>(RanobesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
