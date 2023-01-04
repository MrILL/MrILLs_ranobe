import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenv.config()

const { DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } =
  process.env
console.log(DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE)

const datasource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
} as DataSourceOptions)

datasource
  .initialize()
  .then(() => console.log('Data Source has been initialized'))
  .catch((error) => console.error('Error initializing Data Source', error))

export default datasource
