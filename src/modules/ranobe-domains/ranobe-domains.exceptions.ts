import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

export class RanobeDomainsHttpException extends HttpException {
  constructor(statusCode, message) {
    super(
      {
        success: false,
        error: message,
      },
      statusCode
    )
  }

  static RanobeNotFound() {
    return new NotFoundException('Ranobes Not Found')
  }

  static NotFound() {
    return new NotFoundException('Ranobe With This Domain Not Found')
  }

  static Conflict() {
    return new ConflictException('Ranobe With This Domain Already Exists')
  }

  static DomainUpdateConflict() {
    return new ConflictException(
      'Cannot change url to other domain. If domain no longer have this ranobe - decide to delete domain'
    )
  }

  static InternalServerError(message) {
    return new InternalServerErrorException(message)
  }
}
