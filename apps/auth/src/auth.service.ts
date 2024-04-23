import { Injectable } from '@nestjs/common';
import { UserIdNUllException } from './entity/exception/userId-null.exception';

import { UserIdInvalidException } from './entity/exception/userId-invalid.exception';
import { DeviceNameInvalidException } from './entity/exception/device-name-invalid.exception';
import { ITokenEntityRepository } from './repository/token.entity.repository.interface';
import { DeviceNameUserIdDuplicateException } from './entity/exception/device-name-user-id-duplicate.exception';

@Injectable()
export class AuthService {
  constructor(private readonly tokenRepository: ITokenEntityRepository) {}

  async createTokenAsync(userId: number, deviceName: string): Promise<void> {
    if (userId == null) {
      throw new UserIdNUllException('UserId Null Exception');
    }
    if (userId <= 0) {
      throw new UserIdInvalidException('UserId Invalid Exception');
    }
    if (deviceName == null || deviceName.trim().length == 0) {
      throw new DeviceNameInvalidException('DeviceName Invalid Exception');
    }

    if (await this.tokenRepository.isDuplicate(userId, deviceName)) {
      throw new DeviceNameUserIdDuplicateException(
        'DeviceName and UserId are duplicate',
      );
    }

    return;
  }
}
