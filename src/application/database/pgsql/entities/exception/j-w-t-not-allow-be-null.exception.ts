export class JWTNotAllowBeNullException extends Error {
  constructor(message) {
    super(message);
    this.name = 'JWTNotAllowBeNullException';
  }
}
