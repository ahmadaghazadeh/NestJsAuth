import { DomainError } from '../../common/domain-error';

export class JWTNotAllowBeNullException extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'JWTNotAllowBeNullException';
  }
}
