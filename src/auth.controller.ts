import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './application/service/auth.service';
import { CreateTokenRequest } from './application/service/dto/create-token-request';
import { HttpExceptionFilter } from './filtters/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post()
  async createTokenAsync(@Body() createTokenRequest: CreateTokenRequest) {
    await this.authService.createTokenAsync(
      createTokenRequest.userId,
      createTokenRequest.deviceName,
    );
  }
}
