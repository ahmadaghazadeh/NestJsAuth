import { DomainError } from '../../common/domain-error';

export class DeviceNameUserIdDuplicateException extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'DeviceNameUserIdDuplicateException';
  }
}
