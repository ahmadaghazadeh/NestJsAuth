import { DomainError } from '../../common/domain-error';

export class UserIdInvalidException extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'UserIdInvalidException';
  }
}
