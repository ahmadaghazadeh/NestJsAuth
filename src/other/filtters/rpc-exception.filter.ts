import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch()
export class AllRpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof AggregateError) {
      return super.catch(new RpcException(exception.errors[0].message), host);
    } else {
      return super.catch(new RpcException(exception.message), host);
    }
  }
}
