import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsAlpha,
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
  @IsAlpha()
  @MinLength(3)
  @ApiProperty({ type: 'string', description: "User's firstname" })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(3)
  @ApiProperty({ type: 'string', description: "User's lastname" })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['female', 'male'])
  @ApiProperty({
    type: 'string',
    description: "User's gender (either male or female)",
  })
  gender: Gender;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiPropertyOptional({ type: 'string', description: "User's username" })
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: 'string', description: "User's email" })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', description: "User's password" })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @ApiProperty({
    type: 'number',
    description: "User's height in metres",
  })
  height: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @ApiProperty({ type: 'number', description: "User's weight in kg" })
  weight?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    type: 'number',
    description: "User's current calorie intake in kcal",
  })
  calorieIntake?: number;
}
