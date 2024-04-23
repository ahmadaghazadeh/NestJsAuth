import { DataSource, Repository } from 'typeorm';
import { TokenEntity } from '../entity/token.entity';
import { Injectable } from '@nestjs/common';
import { ITokenEntityRepository } from './token.entity.repository.interface';

@Injectable()
export class TokenEntityRepository
  extends Repository<TokenEntity>
  implements ITokenEntityRepository
{
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    super(TokenEntity, dataSource.createEntityManager());
    this.dataSource = dataSource;
  }

  async isDuplicate(userId: number, deviceName: string): Promise<boolean> {
    const token = this.findOne({
      where: {
        userId: userId,
        deviceName: deviceName,
      },
    });
    return token != null;
  }
}
