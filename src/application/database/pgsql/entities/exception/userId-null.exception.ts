export class UserIdNUllException extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserIdNUllException';
  }
}
