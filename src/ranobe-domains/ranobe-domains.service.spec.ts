import { Test, TestingModule } from '@nestjs/testing';
import { RanobeDomainsService } from './ranobe-domains.service';

describe('RanobeDomainsService', () => {
  let service: RanobeDomainsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RanobeDomainsService],
    }).compile();

    service = module.get<RanobeDomainsService>(RanobeDomainsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
