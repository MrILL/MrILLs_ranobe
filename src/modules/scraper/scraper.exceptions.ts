import { HttpException, NotAcceptableException } from '@nestjs/common'

export class ScraperHttpException extends HttpException {
  static NotAcceptableDomain() {
    return new NotAcceptableException('Cant extract chapter')
  }
}
