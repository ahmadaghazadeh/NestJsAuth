import { DomainError } from '../../common/domain-error';

export class JWTDuplicateException extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'JWTDuplicateException';
  }
}
