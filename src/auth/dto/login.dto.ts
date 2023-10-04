import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string', description: "User's email" })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: "User's password" })
  password: string;
}
