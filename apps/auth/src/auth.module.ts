import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
