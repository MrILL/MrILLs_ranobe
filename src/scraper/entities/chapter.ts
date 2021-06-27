export class Chapter {
  constructor(
    public title: string,
    public body: string,
    public nomer: number,
  ) {}

  isCorrect() {
    return this.title && this.body && this.nomer;
  }
}
