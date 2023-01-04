import { ConflictException, HttpException } from '@nestjs/common'

export class ChaptersHttpException extends HttpException {
  static ConflictUrl(url: string) {
    return new ConflictException(`Chapter with url:${url} already exists`)
  }
}
