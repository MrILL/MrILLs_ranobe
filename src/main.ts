import { Logger, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  })

  app.enableVersioning({
    type: VersioningType.URI,
  })

  // TODO move to env
  const port = 3000
  await app.listen(port)
  const logger = new Logger('Root')
  logger.log(`Listening on port ${port}`)
}
bootstrap()
