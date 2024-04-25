import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './application/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from './db/data-source';
import { TokenEntity } from './application/database/pgsql/entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filtters/http-exception.filter';
import { DataSource, Repository } from 'typeorm';
import { ITokenEntityRepository } from './application/database/providers/token.entity.repository.interface';
import { TokenEntityRepository } from './application/database/pgsql/services/token.entity.repository';
import { IJWTTokenDuplicationChecker } from './application/database/pgsql/entities/domainService/IJWTTokenDuplicationChecker';
import { JWTTokenDuplicationChecker } from './application/database/pgsql/entities/domainService/JWTTokenDuplicationChecker';
import { ITokenDeviceNameUserIdDuplicationChecker } from './application/database/pgsql/entities/domainService/ITokenDeviceNameUserIdDuplicationChecker';
import { TokenDeviceNameUserIdDuplicationChecker } from './application/database/pgsql/entities/domainService/TokenDeviceNameUserIdDuplicationChecker';
import { CreateTokenRequest } from './application/service/dto/create-token-request';
import { INestApplication } from '@nestjs/common';

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

  it('should be created a token successfully', async () => {
    // GIVEN

    const createTokenRequest = new CreateTokenRequest();
    createTokenRequest.userId = 1;
    createTokenRequest.deviceName = 'LG 2';

    // WHEN
    const createTokenRequestPromise =
      await authController.createTokenAsync(createTokenRequest);
    const expected = await tokenEntityRepository.findOne({
      where: {
        userId: createTokenRequest.userId,
        deviceName: createTokenRequest.deviceName,
      },
    });

    // THEN
    expect(createTokenRequest.userId).toBe(expected.userId);
    expect(createTokenRequest.deviceName).toBe(expected.deviceName);
  });
});
