import { Pool } from 'pg';
import { readFile } from 'fs/promises';
import { Inject, Injectable } from '@nestjs/common';
import { DbConfigOptions } from './interfaces/db-config-options.interface';

@Injectable()
export class DbService {
  private readonly db;

  constructor(@Inject('DB_CONFIG_OPTIONS') options: DbConfigOptions) {
    this.db = new Pool(options);
    this.runScript(options.initScriptPath);
  }

  query(...args: any) {
    return this.db.query(...args);
  }

  async runScript(fileUrl: string) {
    const script = (await readFile(fileUrl)).toString();
    return this.query(script);
  }
}
