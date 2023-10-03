import { Module } from '@nestjs/common';
import { WorkoutPlanController } from './workout_plan.controller';
import { WorkoutPlanService } from './workout_plan.service';

@Module({
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService]
})
export class WorkoutPlanModule {}
