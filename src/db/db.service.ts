import { Pool, QueryConfig, QueryResult, QueryResultRow } from 'pg'
import { readFile } from 'fs/promises'
import { Inject, Injectable } from '@nestjs/common'
import { DbConfigOptions } from './interfaces/db-config-options.interface'

@Injectable()
export class DbService {
  private readonly db: Pool

  constructor(@Inject('DB_CONFIG_OPTIONS') options: DbConfigOptions) {
    this.db = new Pool()

    this.runScript(options.initScriptPath)
  }

  query<R extends QueryResultRow = any, I extends any[] = any[]>(
    queryTextOrConfig: string | QueryConfig<I>,
    values?: I
  ): Promise<QueryResult<R>> {
    return this.db.query(queryTextOrConfig, values)
  }

  private async runScript(fileUrl: string) {
    const script = (await readFile(fileUrl)).toString()

    return this.db.query(script)
  }
}
