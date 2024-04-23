import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserIdNUllException } from './exception/userId-null.exception';
import { UserIdInvalidException } from './exception/userId-invalid.exception';
import { DeviceNameInvalidException } from './exception/device-name-invalid.exception';
import { ITokenDeviceNameUserIdDuplicationChecker } from './domainService/ITokenDeviceNameUserIdDuplicationChecker';
import { DeviceNameUserIdDuplicateException } from './exception/device-name-user-id-duplicate.exception';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  public userId: number;
  @Column()
  public deviceName: string;

  constructor() {}

  public static CreateAsync = async (
    tokenDeviceNameUserIdDuplicationChecker: ITokenDeviceNameUserIdDuplicationChecker,
    UserId: number,
    DeviceName: string,
  ): Promise<TokenEntity> => {
    const token = new TokenEntity();

    token.setUserId(UserId);

    token.setDeviceName(DeviceName);

    if (
      await tokenDeviceNameUserIdDuplicationChecker.isDuplicate(
        UserId,
        DeviceName,
      )
    ) {
      throw new DeviceNameUserIdDuplicateException(
        'DeviceName and UserId are duplicate',
      );
    }
    return token;
  };

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
