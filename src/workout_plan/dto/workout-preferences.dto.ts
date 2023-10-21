import { ApiProperty } from '@nestjs/swagger';
import { Goal, RoutineFocus, StrengthLevel, WorkoutType } from '@prisma/client';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class WorkoutPreferencesDto {
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
