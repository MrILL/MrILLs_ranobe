import { InternalServerErrorException, NotFoundException } from '@nestjs/common'

export class RanobesHttpException {
  static NotFound() {
    return new NotFoundException('Ranobes Not Found')
  }

  static InternalServerError(message) {
    return new InternalServerErrorException(message)
  }
}
