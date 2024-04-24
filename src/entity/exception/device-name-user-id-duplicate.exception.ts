export class DeviceNameUserIdDuplicateException extends Error {
  constructor(message) {
    super(message);
    this.name = 'DeviceNameUserIdDuplicateException';
  }
}
