import { Test, TestingModule } from '@nestjs/testing';
import { RanobesController } from './ranobes.controller';
import { RanobesRepository } from './ranobes.repository';
import { RanobesService } from './ranobes.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from 'src/db';

describe('RanobesController', () => {
  let controller: RanobesController;
  let service: RanobesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DbModule.forRoot({
          initScriptPath: process.cwd() + '\\db_scripts\\init.sql',
        }),
      ],
      controllers: [RanobesController],
      providers: [RanobesService, RanobesRepository],
    }).compile();

    controller = module.get<RanobesController>(RanobesController);
    service = module.get<RanobesService>(RanobesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
