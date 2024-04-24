import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from './db/data-source';
import { TokenEntity } from './entity/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filtters/http-exception.filter';
import { DataSource } from 'typeorm';
import { ITokenEntityRepository } from './repository/token.entity.repository.interface';
import { TokenEntityRepository } from './repository/token.entity.repository';
import { IJWTTokenDuplicationChecker } from './entity/domainService/IJWTTokenDuplicationChecker';
import { JWTTokenDuplicationChecker } from './entity/domainService/JWTTokenDuplicationChecker';
import { ITokenDeviceNameUserIdDuplicationChecker } from './entity/domainService/ITokenDeviceNameUserIdDuplicationChecker';
import { TokenDeviceNameUserIdDuplicationChecker } from './entity/domainService/TokenDeviceNameUserIdDuplicationChecker';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(dataSourceOptions),
        TypeOrmModule.forFeature([TokenEntity]),
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
        {
          provide: DataSource,
          useFactory: async () => {
            await dataSource.initialize();
            return dataSource;
          },
        },
        { provide: ITokenEntityRepository, useClass: TokenEntityRepository },
        {
          provide: IJWTTokenDuplicationChecker,
          useClass: JWTTokenDuplicationChecker,
        },
        {
          provide: ITokenDeviceNameUserIdDuplicationChecker,
          useClass: TokenDeviceNameUserIdDuplicationChecker,
        },
        AuthService,
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
