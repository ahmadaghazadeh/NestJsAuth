export class JWTDuplicateException extends Error {
  constructor(message) {
    super(message);
    this.name = 'JWTDuplicateException';
  }
}
