import { HttpException, HttpStatus } from '@nestjs/common'

export class ChaptersHttpException extends HttpException {
  constructor(statusCode, message) {
    super(
      {
        success: false,
        error: message,
      },
      statusCode
    )
  }

  static DomainNotFound() {
    return new ChaptersHttpException(
      HttpStatus.NOT_FOUND,
      'Ranobe From This Domain Not Found'
    )
  }

  static NotFound() {
    return new ChaptersHttpException(
      HttpStatus.NOT_FOUND,
      'Chapters In This Domain Not Found'
    )
  }

  static NotAcceptable() {
    return new ChaptersHttpException(
      HttpStatus.NOT_ACCEPTABLE,
      'Cant extract chapter'
    )
  }

  static Conflict() {
    return new ChaptersHttpException(
      HttpStatus.CONFLICT,
      'Chapter In This Domain Already Exists'
    )
  }

  static InternalServerError(message: string) {
    return new ChaptersHttpException(HttpStatus.INTERNAL_SERVER_ERROR, message)
  }
}
