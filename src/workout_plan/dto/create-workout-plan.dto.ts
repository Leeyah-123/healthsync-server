import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Day } from 'src/utils/common';
import { MinDate } from 'src/utils/common/helpers';

export class CreateWorkoutPlanDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'Name of workout plan',
    example: 'Workout Plan 1',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'More info about workout plan',
    example: 'This workout plan allows a user to increase muscle mass',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'ID of workout routine',
    example: 'clnjakgsx0000f5klt4ttkqbj',
  })
  routineId: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    type: 'string',
    description: 'Workout Traning days',
    example: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  })
  trainingDays: Day[];

  @IsNotEmpty()
  @IsDateString()
  @MinDate(new Date(), {
    message: 'Start Date must not be less than current date',
  })
  @ApiProperty({
    type: 'date',
    description: 'Workout Start Date',
    example: new Date(),
  })
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @MinDate(new Date(), {
    message: 'End Date must not be less than current date',
  })
  @ApiProperty({
    type: 'date',
    description: 'Workout End Date',
    example: new Date(),
  })
  endDate: Date;
}
