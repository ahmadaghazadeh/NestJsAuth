import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { IAuthService } from './auth.interface';

describe('TweetsService', () => {
  let service: IAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<IAuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
