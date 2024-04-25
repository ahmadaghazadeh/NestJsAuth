import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './application/service/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from './db/data-source';
import { TokenEntityRepository } from './application/database/pgsql/services/token.entity.repository';
import { JWTTokenDuplicationChecker } from './application/database/pgsql/entities/domainService/JWTTokenDuplicationChecker';
import { TokenDeviceNameUserIdDuplicationChecker } from './application/database/pgsql/entities/domainService/TokenDeviceNameUserIdDuplicationChecker';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { ITokenEntityRepository } from './application/database/providers/token.entity.repository.interface';
import { IJWTTokenDuplicationChecker } from './application/database/pgsql/entities/domainService/IJWTTokenDuplicationChecker';
import { ITokenDeviceNameUserIdDuplicationChecker } from './application/database/pgsql/entities/domainService/ITokenDeviceNameUserIdDuplicationChecker';
import { TokenEntity } from './application/database/pgsql/entities/token.entity';
import { HttpExceptionFilter } from './filtters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
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
})
export class AuthModule {}
