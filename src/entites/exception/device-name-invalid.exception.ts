import { DomainError } from '../../common/domain-error';

export class DeviceNameInvalidException extends DomainError {
  constructor(message) {
    super(message);
    this.name = 'DeviceNameInvalidException';
  }
}
