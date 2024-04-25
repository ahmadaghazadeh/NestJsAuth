import { ITokenDeviceNameUserIdDuplicationChecker } from './ITokenDeviceNameUserIdDuplicationChecker';
import { ITokenEntityRepository } from '../../../providers/token.entity.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TokenDeviceNameUserIdDuplicationChecker
  implements ITokenDeviceNameUserIdDuplicationChecker
{
  constructor(
    @Inject(ITokenEntityRepository) private repository: ITokenEntityRepository,
  ) {}

  isDuplicate(userId: number, deviceName: string): Promise<boolean> {
    return this.repository.isDuplicateDeviceNameUserID(userId, deviceName);
  }
}
