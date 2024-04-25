import { DomainError } from '../../common/domain-error';

export class UserIdNUllException extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'UserIdNUllException';
  }
}
