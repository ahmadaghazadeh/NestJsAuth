import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

export enum GenericErrorCode {
  INTERNAL = 1,
  NOT_FOUND = 2,
  INVALID_ARGUMENT = 3,
  FORBIDDEN = 4,
  UNAUTHORIZED = 5,
}

export function genericCodeToHttpStatus(code: GenericErrorCode): number {
  switch (code) {
    case GenericErrorCode.NOT_FOUND:
      return 404;
    case GenericErrorCode.INVALID_ARGUMENT:
      return 400;
    case GenericErrorCode.FORBIDDEN:
      return 403;
    case GenericErrorCode.UNAUTHORIZED:
      return 401;
    case GenericErrorCode.INTERNAL:
    default:
      return 500;
  }
}

export function stdStatusToHttpStatus(status: StdStatus): number {
  switch (status) {
    case StdStatus.NotFound:
      return 404;
    case StdStatus.BadRequest:
      return 400;
    case StdStatus.UNAUTHORIZED:
      return 401;
    case StdStatus.PermissionDenied:
      return 403;
    case StdStatus.InternalError:
    default:
      return 500;
  }
}

export function genericCodeToStdStatus(code: GenericErrorCode): StdStatus {
  switch (code) {
    case GenericErrorCode.NOT_FOUND:
      return StdStatus.NotFound;
    case GenericErrorCode.INVALID_ARGUMENT:
      return StdStatus.BadRequest;
    case GenericErrorCode.FORBIDDEN:
      return StdStatus.PermissionDenied;
    case GenericErrorCode.UNAUTHORIZED:
      return StdStatus.UNAUTHORIZED;
    default:
      return StdStatus.InternalError;
  }
}

function genericCodeToRpcStatus(code: GenericErrorCode): status {
  switch (code) {
    case GenericErrorCode.INTERNAL:
      return status.INTERNAL;
    case GenericErrorCode.NOT_FOUND:
      return status.NOT_FOUND;
    case GenericErrorCode.INVALID_ARGUMENT:
      return status.INVALID_ARGUMENT;
    case GenericErrorCode.FORBIDDEN:
      return status.PERMISSION_DENIED;
    case GenericErrorCode.UNAUTHORIZED:
      return status.UNAUTHENTICATED;
  }

  return status.UNKNOWN;
}

function rpcStatusToGenericCode(code: status): GenericErrorCode {
  switch (code) {
    case status.INTERNAL:
      return GenericErrorCode.INTERNAL;
    case status.NOT_FOUND:
      return GenericErrorCode.NOT_FOUND;
    case status.INVALID_ARGUMENT:
      return GenericErrorCode.INVALID_ARGUMENT;
    case status.PERMISSION_DENIED:
      return GenericErrorCode.FORBIDDEN;
    case status.UNAUTHENTICATED:
      return GenericErrorCode.UNAUTHORIZED;
  }

  return GenericErrorCode.INTERNAL;
}

export class GenericError {
  code: GenericErrorCode;
  message: string;
  err: Error;
  data: any;

  constructor(err: Error | any, code?: GenericErrorCode, data?: any) {
    if (err instanceof Error) {
      this.err = err;
      this.message = err.message;
    } else {
      this.message = err;
      this.err = err;
    }
    this.data = data;
    this.code = code || GenericErrorCode.INTERNAL;
  }

  static fromRpcException(e: any): GenericError {
    return new GenericError(e, rpcStatusToGenericCode(e.code), e.details);
  }

  toRpcException(): RpcException {
    return new RpcException({
      code: genericCodeToRpcStatus(this.code),
      message: this.message,
      data: JSON.stringify(this.data),
    });
  }
}
export enum StdStatus {
  Success = 'success',
  BadRequest = 'bad request',
  UNAUTHORIZED = 'unauthorized',
  PermissionDenied = 'permission denied',
  NotFound = 'not found',
  InternalError = 'internal error',
}
