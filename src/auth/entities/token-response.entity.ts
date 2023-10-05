import { ApiProperty } from '@nestjs/swagger';

export default class TokenResponseEntity {
  @ApiProperty({
    example: 'ueqjkplqw390ijwnizji',
    description: 'JWT token for authentication',
  })
  token: string;
}
