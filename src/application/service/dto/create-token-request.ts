import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenRequest {
  @ApiProperty({ example: '123' })
  userId: number;

  @ApiProperty({ example: 'Samsung S21' })
  deviceName: string;
}
