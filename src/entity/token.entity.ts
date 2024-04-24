import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserIdNUllException } from './exception/userId-null.exception';
import { UserIdInvalidException } from './exception/userId-invalid.exception';
import { DeviceNameInvalidException } from './exception/device-name-invalid.exception';
import { ITokenDeviceNameUserIdDuplicationChecker } from './domainService/ITokenDeviceNameUserIdDuplicationChecker';
import { DeviceNameUserIdDuplicateException } from './exception/device-name-user-id-duplicate.exception';
import {
  JWTDuplicateException,
  JWTNotAllowBeNullException,
} from './exception/j-w-t-not-allow-be-null.exception';
import { IJWTTokenDuplicationChecker } from './domainService/IJWTTokenDuplicationChecker';

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  public userId: number;
  @Column()
  public deviceName: string;

  @Column()
  public jwt: string;

  constructor() {}

  public static CreateAsync = async (
    tokenDeviceNameUserIdDuplicationChecker: ITokenDeviceNameUserIdDuplicationChecker,
    jwtTokenDuplicationChecker: IJWTTokenDuplicationChecker,
    userId: number,
    deviceName: string,
    jwt: string,
  ): Promise<TokenEntity> => {
    const token = new TokenEntity();

    token.setUserId(userId);

    token.setDeviceName(deviceName);

    if (
      await tokenDeviceNameUserIdDuplicationChecker.isDuplicate(
        userId,
        deviceName,
      )
    ) {
      throw new DeviceNameUserIdDuplicateException(
        'DeviceName and UserId are duplicate',
      );
    }

    await token.setJWT(jwtTokenDuplicationChecker, jwt);

    return token;
  };

  private async setJWT(
    jwtTokenDuplicationChecker: IJWTTokenDuplicationChecker,
    jwt: string,
  ): Promise<void> {
    if (jwt == null || jwt.length < 0) {
      throw new JWTNotAllowBeNullException('JWT not allowed');
    }
    if (await jwtTokenDuplicationChecker.isDuplicate(jwt)) {
      throw new JWTDuplicateException('JWT already exists');
    }
    this.jwt = jwt;
  }

  private setDeviceName(DeviceName: string) {
    if (DeviceName == undefined) {
      throw new DeviceNameInvalidException('DeviceName invalid Exception');
    }
    this.deviceName = DeviceName;
  }

  private setUserId(UserId: number): void {
    if (UserId == null) {
      throw new UserIdNUllException('UserId Null Exception');
    }

    if (UserId <= 0) {
      throw new UserIdInvalidException('UserId Invalid Exception');
    }

    this.userId = UserId;
  }
}
