import { TokenEntity } from '../token.entity';

export interface ITokenEntityRepository {
  isDuplicateDeviceNameUserID(
    userId: number,
    deviceName: string,
  ): Promise<boolean>;

  isDuplicateJwt(jwt: string): Promise<boolean>;

  saveToken(token: TokenEntity): Promise<void>;
}

export const ITokenEntityRepository = Symbol('ITokenEntityRepository');
