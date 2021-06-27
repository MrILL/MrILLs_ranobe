import { Module, DynamicModule, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { DB_CONFIG_OPTIONS } from './constants';
import { DbConfigOptions } from './interfaces/db-config-options.interface';

@Global()
@Module({})
export class DbModule {
  static forRoot(options: DbConfigOptions): DynamicModule {
    return {
      module: DbModule,
      providers: [
        {
          provide: DB_CONFIG_OPTIONS,
          useValue: options,
        },
        DbService,
      ],
      exports: [DbService],
    };
  }
}
