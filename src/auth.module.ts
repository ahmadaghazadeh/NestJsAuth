import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from './db/data-source';
import { TokenEntityRepository } from './repository/token.entity.repository';
import { JWTTokenDuplicationChecker } from './entity/domainService/JWTTokenDuplicationChecker';
import { TokenDeviceNameUserIdDuplicationChecker } from './entity/domainService/TokenDeviceNameUserIdDuplicationChecker';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { ITokenEntityRepository } from './repository/token.entity.repository.interface';
import { IJWTTokenDuplicationChecker } from './entity/domainService/IJWTTokenDuplicationChecker';
import { ITokenDeviceNameUserIdDuplicationChecker } from './entity/domainService/ITokenDeviceNameUserIdDuplicationChecker';
import { TokenEntity } from './entity/token.entity';
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
})
export class AuthModule {}
