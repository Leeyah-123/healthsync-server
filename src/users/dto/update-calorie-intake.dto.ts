import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateCalorieIntakeDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @ApiProperty({
    type: 'number',
    description: 'Current calorie intake in kcal',
  })
  calorieIntake: number;
}
