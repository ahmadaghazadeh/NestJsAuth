import { AuthService } from './auth.service';
import { UserIdNUllException } from './entity/exception/userId-null.exception';
import { UserIdInvalidException } from './entity/exception/userId-invalid.exception';
import { DeviceNameInvalidException } from './entity/exception/device-name-invalid.exception';
import { DeviceNameUserIdDuplicateException } from './entity/exception/device-name-user-id-duplicate.exception';

describe('AuthService', () => {
  let service: AuthService;
  const tokenEntityRepository = {
    isDuplicate: jest.fn(),
  };
  beforeEach(async () => {
    service = new AuthService(tokenEntityRepository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('userId', () => {
  //   it('userId is null throw UserIdEmptyException', async () => {
  //     // GIVEN
  //     const userId = null;
  //
  //     // WHEN
  //     const result = service.createTokenAsync(userId, 'Samsung S21w');
  //
  //     //THEN
  //     await expect(result).rejects.toThrow(UserIdNUllException);
  //   });
  //
  //   it('userId is less than zero throw UserIdInvalidException', async () => {
  //     // GIVEN
  //     const userId = -1;
  //
  //     // WHEN
  //     const result = service.createTokenAsync(userId, 'Samsung S21w');
  //
  //     //THEN
  //     await expect(result).rejects.toThrow(UserIdInvalidException);
  //   });
  // });
  //
  // describe('deviceName', () => {
  //   it('DeviceName is Null throw DeviceNameNullException', async () => {
  //     // GIVEN
  //     const deviceName = '  ';
  //
  //     // WHEN
  //     const result = service.createTokenAsync(1, deviceName);
  //
  //     //THEN
  //     await expect(result).rejects.toThrow(DeviceNameInvalidException);
  //   });
  //
  //   it('DeviceName and UserId are duplicate throw DeviceNameAndUserIdDuplicateException', async () => {
  //     // GIVEN
  //     const deviceName = 'Samsung S21';
  //
  //     tokenEntityRepository.isDuplicate.mockImplementationOnce(() =>
  //       Promise.resolve(true),
  //     );
  //
  //     // WHEN
  //     const result = service.createTokenAsync(1, deviceName);
  //
  //     //THEN
  //     await expect(result).rejects.toThrow(DeviceNameUserIdDuplicateException);
  //   });
  // });
});
