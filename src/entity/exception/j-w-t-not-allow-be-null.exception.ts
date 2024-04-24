export class JWTNotAllowBeNullException extends Error {
  constructor(message) {
    super(message);
    this.name = 'JWTNotAllowBeNullException';
  }
}

export class JWTDuplicateException extends Error {
  constructor(message) {
    super(message);
    this.name = 'JWTDuplicateException';
  }
}
