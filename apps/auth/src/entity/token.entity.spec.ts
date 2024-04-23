import { UserIdNUllException } from './exception/userId-null.exception';
import { TokenEntity } from './token.entity';
import { UserIdInvalidException } from './exception/userId-invalid.exception';
import { DeviceNameInvalidException } from './exception/device-name-invalid.exception';
import { DeviceNameUserIdDuplicateException } from './exception/device-name-user-id-duplicate.exception';

describe('TokenEntity', () => {
  const tokenDeviceNameUserIdDuplicationChecker = {
    isDuplicate: jest.fn(),
  };
  it('should create a new TokenEntity instance', async () => {
    // GIVEN and WHEN
    const token = await TokenEntity.CreateAsync(
      tokenDeviceNameUserIdDuplicationChecker,
      1,
      'device1',
    );

    // THEN
    expect(token).toBeInstanceOf(TokenEntity);
  });

  it('should deviceName and UserId throw the DeviceNameUserIdDuplicateException', async () => {
    // GIVEN
    const userId = 1;
    const deviceName = 'Samsung S21';
    tokenDeviceNameUserIdDuplicationChecker.isDuplicate.mockImplementationOnce(
      () => Promise.resolve(true),
    );

    // WHEN
    const token = TokenEntity.CreateAsync(
      tokenDeviceNameUserIdDuplicationChecker,
      userId,
      deviceName,
    );

    // THEN
    await expect(token).rejects.toThrow(DeviceNameUserIdDuplicateException);
  });

  describe('UserId', () => {
    it('should throw the UserIdNUllException if UserId is null', async () => {
      // GIVEN
      const userId = null;

      //WHEN
      const token = TokenEntity.CreateAsync(
        tokenDeviceNameUserIdDuplicationChecker,
        userId,
        'Sample',
      );

      // THEN
      await expect(token).rejects.toThrow(UserIdNUllException);
    });

    it('should throw the UserIdInvalidException if userId is less than zero throw ', async () => {
      // GIVEN
      const userId = -1;

      // WHEN
      const token = TokenEntity.CreateAsync(
        tokenDeviceNameUserIdDuplicationChecker,
        userId,
        'Sample',
      );

      //THEN
      await expect(token).rejects.toThrow(UserIdInvalidException);
    });

    it('should retrieve userId', async () => {
      // GIVEN
      const userId = 1;

      // WHEN
      const token = await TokenEntity.CreateAsync(
        tokenDeviceNameUserIdDuplicationChecker,
        userId,
        'device1',
      );

      //THEN
      expect(token.userId).toBe(userId);
    });
  });

  describe('deviceName', () => {
    it('should throw the DeviceNameNullException if deviceName is null', async () => {
      // GIVEN
      const deviceName = null;

      // WHEN
      const token = TokenEntity.CreateAsync(
        tokenDeviceNameUserIdDuplicationChecker,
        1,
        deviceName,
      );

      // THEN
      await expect(token).rejects.toThrow(DeviceNameInvalidException);
    });

    it('should retrieve deviceName', async () => {
      // GIVEN
      const deviceName = 'Samsung S21';

      // WHEN
      const token = await TokenEntity.CreateAsync(
        tokenDeviceNameUserIdDuplicationChecker,
        1,
        deviceName,
      );

      // THEN
      expect(token.deviceName).toBe(deviceName);
    });
  });
});
