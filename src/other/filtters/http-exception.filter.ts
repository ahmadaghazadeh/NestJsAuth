import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from '../../common/domain-error';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const message =
      exception instanceof DomainError ? exception.message : 'Unknown error';
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof AggregateError) {
      let errorMessage = '';
      for (const error of exception.errors) {
        errorMessage = errorMessage + error.message;
      }
      response.status(httpStatus).json({
        statusCode: httpStatus,
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(httpStatus).json({
        statusCode: httpStatus,
        message: message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
