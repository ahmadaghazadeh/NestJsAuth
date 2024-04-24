import { UserIdNUllException } from './exception/userId-null.exception';
import { TokenEntity } from './token.entity';
import { UserIdInvalidException } from './exception/userId-invalid.exception';
import { DeviceNameInvalidException } from './exception/device-name-invalid.exception';
import { DeviceNameUserIdDuplicateException } from './exception/device-name-user-id-duplicate.exception';
import {
  JWTDuplicateException,
  JWTNotAllowBeNullException,
} from './exception/j-w-t-not-allow-be-null.exception';

describe('TokenEntity', () => {
  const tokenDeviceNameUserIdDuplicationChecker = {
    isDuplicate: jest.fn(),
  };

  const tokenJWTDuplicationChecker = {
    isDuplicate: jest.fn(),
  };

  it('should create a new TokenEntity instance', async () => {
    // GIVEN and WHEN
    const token = await getTokenEntityPromise();

    // THEN
    expect(token).toBeInstanceOf(TokenEntity);
  });

  it('should deviceName and UserId throw the DeviceNameUserIdDuplicateException', async () => {
    // GIVEN

    tokenDeviceNameUserIdDuplicationChecker.isDuplicate.mockImplementationOnce(
      () => Promise.resolve(true),
    );

    // WHEN
    const token = getTokenEntityPromise();

    // THEN
    await expect(token).rejects.toThrow(DeviceNameUserIdDuplicateException);
  });

  describe('UserId', () => {
    it('should throw the UserIdNUllException if UserId is null', async () => {
      // GIVEN
      const userId = null;

      //WHEN
      const token = getTokenEntityPromise(userId);

      // THEN
      await expect(token).rejects.toThrow(UserIdNUllException);
    });

    it('should throw the UserIdInvalidException if userId is less than zero throw ', async () => {
      // GIVEN
      const userId = -1;

      // WHEN
      const token = getTokenEntityPromise(userId);

      //THEN
      await expect(token).rejects.toThrow(UserIdInvalidException);
    });

    it('should retrieve userId', async () => {
      // GIVEN
      const userId = 1;

      // WHEN
      const token = await getTokenEntityPromise(userId);

      //THEN
      expect(token.userId).toBe(userId);
    });
  });

  describe('deviceName', () => {
    it('should throw the DeviceNameNullException if deviceName is null', async () => {
      // GIVEN
      const deviceName = null;

      // WHEN
      const token = getTokenEntityPromise(1, deviceName);

      // THEN
      await expect(token).rejects.toThrow(DeviceNameInvalidException);
    });

    it('should retrieve deviceName', async () => {
      // GIVEN
      const deviceName = 'Samsung S21';

      // WHEN
      const token = await getTokenEntityPromise(1, deviceName);

      // THEN
      expect(token.deviceName).toBe(deviceName);
    });
  });

  describe('jwt', () => {
    it('should throw the JWTNotAllowBeNullException if jwt is null', async () => {
      // GIVEN
      const jwt = null; // TODO: discuss-> better generate it inside the TokenEntity or generate inside the AuthService

      // WHEN
      const token = getTokenEntityPromise(1, 'test', jwt);

      // THEN
      await expect(token).rejects.toThrow(JWTNotAllowBeNullException);
    });

    it('should throw the JWTDuplicateException if jwt is duplicate', async () => {
      // GIVEN
      const jwt = 'asd123';
      tokenJWTDuplicationChecker.isDuplicate.mockImplementationOnce(() =>
        Promise.resolve(true),
      );

      // WHEN
      const token = getTokenEntityPromise(1, 'test', jwt);

      // THEN
      await expect(token).rejects.toThrow(JWTDuplicateException);
    });

    it('should jwt retrieve', async () => {
      // GIVEN
      const jwt = 'asd123';

      // WHEN
      const token = await getTokenEntityPromise(1, 'test', jwt);

      // THEN
      expect(token.jwt).toBe(jwt);
    });
  });

  function getTokenEntityPromise(
    userId: number = 1,
    deviceName: string = 'Samsung S21',
    jwt: string = 'ABC123dasjkhjknnkjsahd1298',
  ) {
    return TokenEntity.CreateAsync(
      tokenDeviceNameUserIdDuplicationChecker,
      tokenJWTDuplicationChecker,
      userId,
      deviceName,
      jwt,
    );
  }
});
