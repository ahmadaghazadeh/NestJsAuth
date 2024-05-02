import { Inject, Injectable } from '@nestjs/common';

import { ITokenEntityRepository } from './entites/domainService/token.entity.repository.interface';
import { TokenEntity } from './entites/token.entity';
import { ITokenDeviceNameUserIdDuplicationChecker } from './entites/domainService/contract/ITokenDeviceNameUserIdDuplicationChecker';
import { IJWTTokenDuplicationChecker } from './entites/domainService/contract/IJWTTokenDuplicationChecker';
import { JwtService } from '@nestjs/jwt';
import { HandleError } from './common/error-handler';
import { Err, Ok, Result } from './common/result';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ITokenDeviceNameUserIdDuplicationChecker)
    private tokenDeviceNameUserIdDuplicationChecker: ITokenDeviceNameUserIdDuplicationChecker,
    @Inject(IJWTTokenDuplicationChecker)
    private jwtTokenDuplicationChecker: IJWTTokenDuplicationChecker,
    @Inject(ITokenEntityRepository)
    private readonly tokenRepository: ITokenEntityRepository,
    private jwtService: JwtService,
  ) {}

  async createTokenAsync(userId: number, deviceName: string): Promise<void> {
    const payload = { sub: userId, username: userId, createdAt: new Date() };
    const jwt = await this.jwtService.signAsync(payload); //TODO: We can use service. like this tokenGenerator.generate()
    const token = await TokenEntity.CreateAsync(
      this.tokenDeviceNameUserIdDuplicationChecker,
      this.jwtTokenDuplicationChecker,
      userId,
      deviceName,
      jwt,
    );
    await this.tokenRepository.saveToken(token);
  }

  async saveTokenWithoutResultError() {
    const token = new TokenEntity();
    await this.tokenRepository.saveTokenWithoutResultError(token);
  }

  @HandleError
  async saveTokenWithResultError(): Promise<Result<TokenEntity>> {
    const token = new TokenEntity();
    const result = await this.tokenRepository.saveTokenWithResultError(token);
    if (result.isError()) {
      return Err(result.err);
    }
    return Ok(result.value);
  }
}
