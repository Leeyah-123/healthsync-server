import { ApiProperty } from '@nestjs/swagger';
import { Goal, RoutineFocus, StrengthLevel, WorkoutType } from '@prisma/client';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Routine } from 'src/utils/common';

export class CreateWorkoutRoutineDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'Name of routine',
    example: 'Push Ups',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    description: 'More info about routine',
    example: 'Cardio routine',
  })
  description: string;

  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: '[Routine]',
    description: 'Workout Routine',
    example: {
      'Push Ups': {
        description: 'Do 100 push ups',
        duration: '10 minutes',
        optional: false,
      },
    },
  })
  routine: Routine;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    type: 'number',
    description: 'Duration in minutes of routine',
    example: 45,
  })
  duration: number;

  @IsOptional()
  @IsString()
  @IsIn(['LOSE_FAT', 'MAINTAIN_TONE', 'BUILD_MUSCLE'])
  @ApiProperty({
    type: 'Goal',
    description: 'Primary goals. One of: LOSE_FAT, MAINTAIN_TONE, BUILD_MUSCLE',
    example: 'LOSE_FAT',
  })
  primaryGoal?: Goal;

  @IsOptional()
  @IsString()
  @IsIn(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])
  @ApiProperty({
    type: 'StrengthLevel',
    description: 'Primary goals. One of: BEGINNER, INTERMEDIATE, ADVANCED',
    example: 'BEGINNER',
  })
  strengthLevel?: StrengthLevel;

  @IsOptional()
  @IsString()
  @IsIn(['WEIGHTED', 'BODY_WEIGHT', 'NO_EQUIPMENT'])
  @ApiProperty({
    type: 'WorkoutType',
    description: 'Primary goals. One of: WEIGHTED, BODY_WEIGHT, NO_EQUIPMENT',
    example: 'WEIGHTED',
  })
  workoutType?: WorkoutType;

  @IsOptional()
  @IsString()
  @IsIn(['AESTHETICS', 'STRENGTH'])
  @ApiProperty({
    type: 'RoutineFocus',
    description: 'Primary goals. One of: AESTHETICS, STRENGTH',
    example: 'STRENGTH',
  })
  routineFocus?: RoutineFocus;
}
