import { HttpException, HttpStatus } from '@nestjs/common';

export class ScraperHttpException extends HttpException {
  constructor(statusCode, message) {
    super(
      {
        success: false,
        error: message,
      },
      statusCode,
    );
  }

  static NotAcceptableDomain() {
    return new ScraperHttpException(
      HttpStatus.NOT_ACCEPTABLE,
      'Cant extract chapter',
    );
  }
}
