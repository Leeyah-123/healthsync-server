import { ApiProperty } from '@nestjs/swagger';

export default class TokenResponseEntity {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsbmsyYXU4djAwMDBmNW90MXE0NnY3aDMiLCJpYXQiOjE2OTY5MjY2Mjh9.XhXwjm3TNJC4YX4huvlEXbduOU5PHAbhIUv_EeBI4lo',
    description: 'JWT token for authentication',
  })
  token: string;
}
