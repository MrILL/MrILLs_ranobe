import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

export class RanobesHttpException {
  static NotFound() {
    return new NotFoundException('Ranobes Not Found')
  }

  static ConflictAlreadyExists(url: string) {
    return new ConflictException(`Ranobe with url:${url} already exists`)
  }

  static InternalServerError(message) {
    return new InternalServerErrorException(message)
  }
}
