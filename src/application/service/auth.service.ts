import { Inject, Injectable } from '@nestjs/common';

import { ITokenEntityRepository } from '../database/providers/token.entity.repository.interface';
import { TokenEntity } from '../database/pgsql/entities/token.entity';
import { ITokenDeviceNameUserIdDuplicationChecker } from '../database/pgsql/entities/domainService/ITokenDeviceNameUserIdDuplicationChecker';
import { IJWTTokenDuplicationChecker } from '../database/pgsql/entities/domainService/IJWTTokenDuplicationChecker';
import { JwtService } from '@nestjs/jwt';

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
}
