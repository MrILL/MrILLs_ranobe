import { Logger, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  })

  app.enableVersioning({
    type: VersioningType.URI,
  })

  const logger = app.get(Logger)
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port)
  logger.log(`Listening on port ${port}`)
}
bootstrap()
