import { Repository } from 'typeorm';
import { TokenEntity } from '../entity/token.entity';
import { Injectable } from '@nestjs/common';
import { ITokenEntityRepository } from './token.entity.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokenEntityRepository
  extends Repository<TokenEntity>
  implements ITokenEntityRepository
{
  constructor(
    @InjectRepository(TokenEntity)
    repository: Repository<TokenEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async isDuplicateJwt(jwt: string): Promise<boolean> {
    const token = await this.findOne({
      where: {
        jwt: jwt,
      },
    });
    return token != null;
  }

  async isDuplicateDeviceNameUserID(
    userId: number,
    deviceName: string,
  ): Promise<boolean> {
    const token = await this.findOne({
      where: {
        userId: userId,
        deviceName: deviceName,
      },
    });
    return token != null;
  }

  async saveToken(token: TokenEntity): Promise<void> {
    const newToken = this.create(token);
    await this.save(newToken);
  }
}
