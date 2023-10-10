import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePersonalInfoDto {
  @IsOptional()
  @IsAlpha()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  firstName?: string;

  @IsOptional()
  @IsAlpha()
  @IsString()
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;
}
