import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateWeightDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @ApiProperty({
    type: 'number',
    description: 'New weight in kg',
  })
  weight: number;
}
