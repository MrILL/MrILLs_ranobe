import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common'

export class ChaptersHttpException extends HttpException {
  static DomainNotFound() {
    return new NotFoundException('Ranobe From This Domain Not Found')
  }

  static NotFound() {
    return new NotFoundException('Chapters In This Domain Not Found')
  }

  static NotAcceptable() {
    return new NotAcceptableException('Cant extract chapter')
  }

  static Conflict() {
    return new ConflictException('Chapter In This Ranobe Already Exists')
  }

  static ConflictAlreadyExists(url: string) {
    return new ConflictException(`Chapter with url:${url} already exists`)
  }

  static InternalServerError(message: string) {
    return new InternalServerErrorException(message)
  }
}
