import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ type: 'string', description: "User's firstname" })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ type: 'string', description: "User's lastname" })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string', description: "User's email" })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['female', 'male'])
  @ApiProperty({
    type: 'string',
    description: "User's gender (either male or female)",
  })
  gender: 'male' | 'female';

  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiProperty({ type: 'string', description: "User's username" })
  username?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: "User's password" })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @ApiProperty({ type: 'number', description: "User's weight in kg" })
  weight: number;
}
