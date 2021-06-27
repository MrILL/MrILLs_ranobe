import { HttpException, HttpStatus } from '@nestjs/common';

export class RanobesHttpException extends HttpException {
  constructor(statusCode, message) {
    super(
      {
        success: false,
        error: message,
      },
      statusCode,
    );
  }

  static NotFound() {
    return new RanobesHttpException(HttpStatus.NOT_FOUND, 'Ranobes Not Found');
  }

  static InternalServerError(message) {
    return new RanobesHttpException(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}
