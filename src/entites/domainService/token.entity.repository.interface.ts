import { TokenEntity } from '../token.entity';
import { Result } from '../../common/result';

export interface ITokenEntityRepository {
  isDuplicateDeviceNameUserID(
    userId: number,
    deviceName: string,
  ): Promise<boolean>;

  isDuplicateJwt(jwt: string): Promise<boolean>;

  saveToken(token: TokenEntity): Promise<void>;

  saveTokenWithResultError(token: TokenEntity): Promise<Result<TokenEntity>>;

  saveTokenWithoutResultError(token: TokenEntity): Promise<void>;
}

export const ITokenEntityRepository = Symbol('ITokenEntityRepository');
