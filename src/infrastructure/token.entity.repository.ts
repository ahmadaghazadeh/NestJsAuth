import { Repository } from 'typeorm';
import { TokenEntity } from '../entites/token.entity';
import { Injectable } from '@nestjs/common';
import { ITokenEntityRepository } from '../entites/domainService/token.entity.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Ok, Result } from 'src/common/result';
import { HandleError } from '../common/error-handler';

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

  async saveTokenWithoutResultError(token: TokenEntity): Promise<void> {
    const newToken = this.create(token);
    await this.save(newToken);
  }

  @HandleError
  async saveTokenWithResultError(
    token: TokenEntity,
  ): Promise<Result<TokenEntity>> {
    const newToken = this.create(token);
    await this.save(newToken);

    return Ok(token);
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
