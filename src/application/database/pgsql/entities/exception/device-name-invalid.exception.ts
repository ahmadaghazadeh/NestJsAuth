export class DeviceNameInvalidException extends Error {
  constructor(message) {
    super(message);
    this.name = 'DeviceNameInvalidException';
  }
}
