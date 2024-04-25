export interface ITokenDeviceNameUserIdDuplicationChecker {
  isDuplicate(userId: number, deviceName: string): Promise<boolean>;
}

export const ITokenDeviceNameUserIdDuplicationChecker = Symbol(
  'ITokenDeviceNameUserIdDuplicationChecker',
);
