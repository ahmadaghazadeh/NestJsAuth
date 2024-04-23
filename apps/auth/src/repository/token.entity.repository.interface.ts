export interface ITokenEntityRepository {
  isDuplicate(userId: number, deviceName: string): Promise<boolean>;
}
