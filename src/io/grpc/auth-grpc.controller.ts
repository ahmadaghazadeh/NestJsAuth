import { Controller, Logger, UseFilters } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { CreateTokenRequest } from '../../dto/create-token-request';
import { TokenResponse } from '../../dto/token-response';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { AllRpcExceptionFilter } from '../../other/filtters/rpc-exception.filter';

@UseFilters(new AllRpcExceptionFilter())
@Controller()
export class AuthGrpcController {
  private readonly logger = new Logger(AuthGrpcController.name);
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthGrpcService', 'login')
  async login(data: CreateTokenRequest): Promise<TokenResponse> {
    this.logger.debug('create user called');

    await this.authService.createTokenAsync(data.userId, data.deviceName);
    const response = new TokenResponse();
    response.access_token = 'aaaaaaaaaaa';
    return Promise.resolve(response);
  }
}
