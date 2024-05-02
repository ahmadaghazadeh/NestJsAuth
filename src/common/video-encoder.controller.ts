import { Response } from 'express';
import { Result } from './result';
import { stdStatusToHttpStatus } from './generic-error';
import { StdResponse } from './std-response';

export abstract class AbstractHttpController {
  protected buildResponse<T>(res: Response, result: Result<T>): void {
    const stdRes = StdResponse.fromResult(result);

    this.sendStdResponse<T>(res, stdRes, true);
  }

  protected sendStdResponse<T>(
    res: Response,
    stdRes: StdResponse<T>,
    fromResult = false,
  ): void {
    const httpCode = stdStatusToHttpStatus(stdRes.status);

    res.status(httpCode).json(stdRes);
  }
}
