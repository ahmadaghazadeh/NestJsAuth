export interface IJWTTokenDuplicationChecker {
  isDuplicate(jwt: string): Promise<boolean>;
}

export const IJWTTokenDuplicationChecker = 'IJWTTokenDuplicationChecker';
