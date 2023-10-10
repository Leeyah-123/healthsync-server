import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/utils/common';
import { CreateWorkoutPlanDto, CreateWorkoutRoutineDto } from './dto';
import { WorkoutPlanService } from './workout_plan.service';

@Controller('workout-plan')
@ApiTags('Workout Plan')
export class WorkoutPlanController {
  constructor(private readonly workoutPlanService: WorkoutPlanService) {}

  @Get('/plan')
  @UseGuards(AuthGuard)
  getWorkoutPlans(@Req() req: RequestWithUser) {
    return this.workoutPlanService.getWorkoutPlans(req.user.id);
  }

  @Get('/routine')
  @UseGuards(AuthGuard)
  getWorkoutRoutines(@Req() req: RequestWithUser) {
    return this.workoutPlanService.getWorkoutRoutines(req.user.id);
  }

  @Get('/plan/:id')
  @UseGuards(AuthGuard)
  async getWorkoutPlanById(@Param('id') id: string) {
    const workoutPlan = await this.workoutPlanService.getWorkoutPlanById(id);
    if (!workoutPlan) throw new NotFoundException('Workout plan not found');

    return workoutPlan;
  }

  @Get('/routine/:id')
  @UseGuards(AuthGuard)
  async getWorkoutRoutineById(@Param('id') id: string) {
    const workoutRoutine =
      await this.workoutPlanService.getWorkoutRoutineById(id);
    if (!workoutRoutine)
      throw new NotFoundException('Workout routine not found');

    return workoutRoutine;
  }

  @Post('/plan')
  @UseGuards(AuthGuard)
  createWorkoutPlan(
    @Req() req: RequestWithUser,
    @Body() dto: CreateWorkoutPlanDto,
  ) {
    return this.workoutPlanService.createWorkoutPlan(req.user.id, dto);
  }

  @Post('/routine')
  @UseGuards(AuthGuard)
  createWorkoutRoutine(
    @Req() req: RequestWithUser,
    @Body() dto: CreateWorkoutRoutineDto,
  ) {
    return this.workoutPlanService.createWorkoutRoutine(req.user, dto);
  }

  @Patch('/checkpoint/:id')
  @UseGuards(AuthGuard)
  checkpointWorkout(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.workoutPlanService.checkpointWorkoutPlan(id, req.user.id, true);
  }

  @Delete('/plan/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  deleteWorkoutPlan(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.workoutPlanService.deleteWorkoutPlan(id, req.user.id);
  }

  @Delete('/routine/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  deleteWorkoutRoutine(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.workoutPlanService.deleteWorkoutRoutine(
      id,
      req.user.id,
      req.user.role,
    );
  }
}
