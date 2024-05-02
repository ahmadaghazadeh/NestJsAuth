import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from './other/db/data-source';
import { TokenEntityRepository } from './infrastructure/token.entity.repository';
import { JWTTokenDuplicationChecker } from './entites/domainService/JWTTokenDuplicationChecker';
import { TokenDeviceNameUserIdDuplicationChecker } from './entites/domainService/TokenDeviceNameUserIdDuplicationChecker';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { ITokenEntityRepository } from './entites/domainService/token.entity.repository.interface';
import { IJWTTokenDuplicationChecker } from './entites/domainService/contract/IJWTTokenDuplicationChecker';
import { ITokenDeviceNameUserIdDuplicationChecker } from './entites/domainService/contract/ITokenDeviceNameUserIdDuplicationChecker';
import { TokenEntity } from './entites/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './other/constants';
import { AuthGrpcController } from './io/grpc/auth-grpc.controller';
import { AuthController } from './auth.controller';

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
  controllers: [AuthGrpcController, AuthController],
  providers: [
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
//
// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import dataSource, { dataSourceOptions } from './other/db/data-source';
// import { TokenEntityRepository } from './infrastructure/token.entity.repository';
// import { JWTTokenDuplicationChecker } from './entites/domainService/JWTTokenDuplicationChecker';
// import { TokenDeviceNameUserIdDuplicationChecker } from './entites/domainService/TokenDeviceNameUserIdDuplicationChecker';
// import { DataSource } from 'typeorm';
// import { ConfigModule } from '@nestjs/config';
// import { ITokenEntityRepository } from './entites/domainService/token.entity.repository.interface';
// import { IJWTTokenDuplicationChecker } from './entites/domainService/contract/IJWTTokenDuplicationChecker';
// import { ITokenDeviceNameUserIdDuplicationChecker } from './entites/domainService/contract/ITokenDeviceNameUserIdDuplicationChecker';
// import { TokenEntity } from './entites/token.entity';
// import { APP_FILTER } from '@nestjs/core';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './other/constants';
// import { AuthGrpcController } from './io/grpc/auth-grpc.controller';
// import { AuthController } from './auth.controller';
// import { AllRpcExceptionFilter } from './other/filtters/rpc-exception.filter';
//
// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRoot(dataSourceOptions),
//     TypeOrmModule.forFeature([TokenEntity]),
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.secret,
//     }),
//   ],
//   controllers: [AuthGrpcController, AuthController],
//   providers: [
//     // {
//     //   provide: APP_FILTER,
//     //   useClass: AllRpcExceptionFilter,
//     // },
//     {
//       provide: DataSource,
//       useFactory: async () => {
//         await dataSource.initialize();
//         return dataSource;
//       },
//     },
//     { provide: ITokenEntityRepository, useClass: TokenEntityRepository },
//     {
//       provide: IJWTTokenDuplicationChecker,
//       useClass: JWTTokenDuplicationChecker,
//     },
//     {
//       provide: ITokenDeviceNameUserIdDuplicationChecker,
//       useClass: TokenDeviceNameUserIdDuplicationChecker,
//     },
//     AuthService,
//   ],
// })
// export class AuthModule {}
