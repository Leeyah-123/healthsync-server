import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import {
  PrismaClient,
  User,
  WorkoutPlan,
  WorkoutRoutine,
} from '@prisma/client';
import { CreateWorkoutPlanDto, CreateWorkoutRoutineDto } from './dto';

const prisma = new PrismaClient();

@Injectable()
export class WorkoutPlanService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  getWorkoutPlans(userId: string): Promise<WorkoutPlan[]> {
    return prisma.workoutPlan.findMany({
      where: {
        authorId: userId,
      },
      include: { routine: true },
    });
  }

  getWorkoutRoutines(userId: string): Promise<WorkoutRoutine[]> {
    return prisma.workoutRoutine.findMany({
      where: {
        OR: [
          {
            userId,
          },
          {
            userId: null,
          },
        ],
      },
    });
  }

  getWorkoutPlanById(id: string): Promise<WorkoutPlan | null> {
    return prisma.workoutPlan.findUnique({
      where: { id },
      include: { routine: true },
    });
  }

  getWorkoutRoutineById(id: string): Promise<WorkoutRoutine | null> {
    return prisma.workoutRoutine.findUnique({
      where: { id },
    });
  }

  async createWorkoutPlan(
    userId: string,
    dto: CreateWorkoutPlanDto,
  ): Promise<WorkoutPlan> {
    const routine = await this.getWorkoutRoutineById(dto.routineId);
    if (!routine) throw new NotFoundException('Routine not found');

    dto.startDate = new Date(dto.startDate);
    dto.endDate = new Date(dto.endDate);

    if (dto.endDate <= dto.startDate)
      throw new BadRequestException('End Date must be greater than start date');

    return prisma.workoutPlan.create({
      data: {
        ...dto,
        authorId: userId,
        progress: {},
      },
      include: { routine: true },
    });
  }

  // TODO: Use cron jobs to schedule notifications and checkpoint
  createWorkoutRoutine(
    user: User,
    dto: CreateWorkoutRoutineDto,
  ): Promise<WorkoutRoutine> {
    let userId: string | null = null;
    if (user.role !== 'admin') userId = user.id;

    return prisma.workoutRoutine.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async checkpointWorkoutPlan(id: string, userId: string, done: boolean) {
    const workoutPlan = await this.getWorkoutPlanById(id);
    if (!workoutPlan) throw new NotFoundException('Workout Plan not found');

    if (workoutPlan.completed)
      throw new BadRequestException('Workout already completed');
    if (workoutPlan.startDate > new Date())
      throw new BadRequestException('Workout not yet started');
    if (workoutPlan.endDate < new Date())
      throw new BadRequestException('Workout duration already ended');

    const currentDate = new Date();
    const workoutPlanProgress = workoutPlan.progress as object;

    return prisma.workoutPlan.update({
      where: {
        id,
        authorId: userId,
      },
      data: {
        progress: {
          ...workoutPlanProgress,
          [currentDate.toString()]: done,
        },
      },
      include: { routine: true },
    });
  }

  async deleteWorkoutPlan(id: string, userId: string) {
    const workoutPlan = await this.getWorkoutPlanById(id);
    if (!workoutPlan) throw new NotFoundException('Workout Plan not found');

    if (workoutPlan.authorId !== userId) throw new UnauthorizedException();

    return prisma.workoutPlan.delete({
      where: { id },
      include: { routine: true },
    });
  }

  async deleteWorkoutRoutine(id: string, userId: string, role: string) {
    const workoutRoutine = await this.getWorkoutRoutineById(id);
    if (!workoutRoutine)
      throw new NotFoundException('Workout Routine not found');

    if (workoutRoutine.userId !== userId && role !== 'admin')
      throw new UnauthorizedException();

    return prisma.workoutRoutine.delete({ where: { id } });
  }

  // TODO: Complete cron job function
  // addCronJob(
  //   name: string,
  //   startDate: string,
  //   endDate: string,
  //   startMonth: string,
  //   endMonth: string,
  // ) {
  //   const job = new CronJob(`0 0 7 * * 1-5`, () => {
  //     console.warn('wee');
  //   });

  //   this.schedulerRegistry.addCronJob(name, job);
  //   job.start();

  //   this.logger.warn(
  //     `job ${name} added for each minute at ${seconds} seconds!`,
  //   );
  // }
}
