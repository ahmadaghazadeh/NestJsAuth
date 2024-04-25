export class UserIdInvalidException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserIdInvalidException';
  }
}
