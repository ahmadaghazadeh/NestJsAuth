import { genericCodeToStdStatus, StdStatus } from './generic-error';
import { Result } from './result';

export class StdResponse<T> {
  public status: StdStatus;
  public message: string;
  public data: T;

  constructor(data: T, message: string, status: string) {
    this.status = status as StdStatus;
    this.message = message;
    this.data = data;
  }

  static fromResult<T>(result: Result<T>): StdResponse<T> {
    if (result.isOk()) {
      return new StdResponse<T>(result.value, '', StdStatus.Success);
    }

    return new StdResponse<T>(
      result.err.data,
      result.err.message,
      genericCodeToStdStatus(result.err.code),
    );
  }
}
