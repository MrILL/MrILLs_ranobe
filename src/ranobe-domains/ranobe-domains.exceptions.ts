import { HttpException, HttpStatus } from '@nestjs/common'

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
    return new RanobeDomainsHttpException(
      HttpStatus.NOT_FOUND,
      'Ranobes Not Found'
    )
  }

  static NotFound() {
    return new RanobeDomainsHttpException(
      HttpStatus.NOT_FOUND,
      'Ranobe With This Domain Not Found'
    )
  }

  static Conflict() {
    return new RanobeDomainsHttpException(
      HttpStatus.CONFLICT,
      'Ranobe With This Domain Already Exists'
    )
  }

  static InternalServerError(message) {
    return new RanobeDomainsHttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      message
    )
  }
}
