import { IJWTTokenDuplicationChecker } from './contract/IJWTTokenDuplicationChecker';
import { Inject, Injectable } from '@nestjs/common';
import { ITokenEntityRepository } from './token.entity.repository.interface';

@Injectable()
export class JWTTokenDuplicationChecker implements IJWTTokenDuplicationChecker {
  constructor(
    @Inject(ITokenEntityRepository) private repository: ITokenEntityRepository,
  ) {}

  isDuplicate(jwt: string): Promise<boolean> {
    return this.repository.isDuplicateJwt(jwt);
  }
}
