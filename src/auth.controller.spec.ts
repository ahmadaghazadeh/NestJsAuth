import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entites/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './other/constants';
import { APP_FILTER } from '@nestjs/core';
import { ITokenEntityRepository } from './entites/domainService/token.entity.repository.interface';
import { TokenEntityRepository } from './infrastructure/token.entity.repository';
import { IJWTTokenDuplicationChecker } from './entites/domainService/contract/IJWTTokenDuplicationChecker';
import { JWTTokenDuplicationChecker } from './entites/domainService/JWTTokenDuplicationChecker';
import { ITokenDeviceNameUserIdDuplicationChecker } from './entites/domainService/contract/ITokenDeviceNameUserIdDuplicationChecker';
import { TokenDeviceNameUserIdDuplicationChecker } from './entites/domainService/TokenDeviceNameUserIdDuplicationChecker';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './other/filtters/http-exception.filter';
import { Repository } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;
  let tokenEntityRepository: Repository<TokenEntity>;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'train-chat-test-database',
          entities: [TokenEntity],
          dropSchema: true,
          synchronize: true,
        }),
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
    app = module.createNestApplication();
    await app.init();
    authController = app.get<AuthController>(AuthController);
    tokenEntityRepository = app.get(getRepositoryToken(TokenEntity));
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // it('should be created a token successfully', async () => {
  //   // GIVEN
  //
  //   const createTokenRequest = new CreateTokenRequest();
  //   createTokenRequest.userId = 1;
  //   createTokenRequest.deviceName = 'LG 2';
  //
  //   // WHEN
  //   const createTokenRequestPromise =
  //     await authController.createTokenAsync(createTokenRequest);
  //   const expected = await tokenEntityRepository.findOne({
  //     where: {
  //       userId: createTokenRequest.userId,
  //       deviceName: createTokenRequest.deviceName,
  //     },
  //   });
  //
  //   // THEN
  //   expect(createTokenRequest.userId).toBe(expected.userId);
  //   expect(createTokenRequest.deviceName).toBe(expected.deviceName);
  // });
});
