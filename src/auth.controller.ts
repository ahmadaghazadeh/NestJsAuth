import { Body, Controller, Get, Post, Res, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from './other/filtters/http-exception.filter';
import { HandleError } from './common/error-handler';
import path from 'path';
import { AbstractHttpController } from './common/video-encoder.controller';
import { Ok } from './common/result';

@Controller()
export class AuthController extends AbstractHttpController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  // @Post()
  // async createTokenAsync(@Body() createTokenRequest: CreateTokenRequest) {
  //   await this.authService.createTokenAsync(
  //     createTokenRequest.userId,
  //     createTokenRequest.deviceName,
  //   );
  // }

  @HandleError
  async saveTokenWithResultError(): Promise<void> {
    const result = await this.authService.saveTokenWithResultError();
    if (result.isError()) {
      this.buildResponse(null, result);
      return;
    }

    this.buildResponse(null, Ok(result));
  }

  @UseFilters(new HttpExceptionFilter())
  @Post('/saveToken22')
  async saveTokenWithoutResultError() {
    await this.authService.saveTokenWithoutResultError();
  }
}
