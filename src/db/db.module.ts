import { Module, DynamicModule, Global, ModuleMetadata } from '@nestjs/common'
import { DbService } from './db.service'
import { DB_CONFIG_OPTIONS } from './constants'
import { DbConfigOptions } from './interfaces/db-config-options.interface'

export interface DbModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string
  useFactory?: (...args: any[]) => Promise<any> | any
  inject?: any[]
}

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
    }
  }
}
