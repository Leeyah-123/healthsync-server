import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Prisma, PrismaClient, Role, User } from '@prisma/client';
import { NotificationsService } from 'src/notifications/notifications.service';
import { SCHEDULE_UNSUSPEND_USER_EVENT } from 'src/utils/common';
import { CreateUserDto, SuspendUserDto, UpdatePersonalInfoDto } from './dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
    private readonly notificationsService: NotificationsService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async addUser(dto: CreateUserDto): Promise<User> {
    const currentDate = new Date();

    const weight = dto.weight;
    const calorieIntake = dto.calorieIntake;

    if (weight) delete dto.weight;
    if (calorieIntake) delete dto.calorieIntake;

    const createUserData:
      | (Prisma.Without<
          Prisma.UserCreateInput,
          Prisma.UserUncheckedCreateInput
        > &
          Prisma.UserUncheckedCreateInput)
      | (Prisma.Without<
          Prisma.UserUncheckedCreateInput,
          Prisma.UserCreateInput
        > &
          Prisma.UserCreateInput) = {
      ...dto,
    };

    if (weight) {
      createUserData.currentWeight = weight;
      createUserData.weightHistory = { [currentDate.toString()]: weight };
    }

    if (calorieIntake) {
      createUserData.currentCalorieIntake = calorieIntake;
      createUserData.calorieIntakeHistory = {
        [currentDate.toString()]: calorieIntake,
      };
    }

    return prisma.user.create({
      data: createUserData,
    });
  }

  async changeUserRole(userId: string, role: Role): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });
  }

  async updatePersonalInfo(
    userId: string,
    dto: UpdatePersonalInfoDto,
  ): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    return prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
  }

  async updateUserWeight(userId: string, weight: number): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const currentDate = new Date();
    const weightHistory = user.weightHistory as object;

    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        currentWeight: weight,
        weightHistory: {
          ...weightHistory,
          [currentDate.toString()]: weight,
        },
      },
    });
  }

  async updateUserCalorieIntake(
    userId: string,
    calorieIntake: number,
  ): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new NotFoundException('User not found');

    const currentDate = new Date();
    const calorieIntakeHistory = user.calorieIntakeHistory as object;

    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        currentCalorieIntake: calorieIntake,
        weightHistory: {
          ...calorieIntakeHistory,
          [currentDate.toString()]: calorieIntake,
        },
      },
    });
  }

  async suspendUser(moderatorId: string, dto: SuspendUserDto): Promise<User> {
    let user = await this.findUserById(dto.id);
    if (!user) throw new NotFoundException('User not found');
    if (user.suspended) throw new BadRequestException('User already suspended');
    if (user.role !== 'user')
      throw new BadRequestException('Can only suspend users');

    try {
      user = await prisma.user.update({
        where: {
          id: dto.id,
        },
        data: {
          suspended: true,
          suspendedBy: moderatorId,
        },
      });

      this.eventEmitter.emit(SCHEDULE_UNSUSPEND_USER_EVENT, dto);
      return user;
    } catch (err) {
      return err;
    }
  }

  async unsuspendUser(id: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        suspended: false,
        suspendedBy: null,
      },
    });
  }

  // TODO: Send notification to user after suspend and unsuspend
  @OnEvent(SCHEDULE_UNSUSPEND_USER_EVENT, { async: true })
  async scheduleUnsuspendUser(payload: SuspendUserDto) {
    await this.notificationsService.sendNotification({
      to: payload.id,
      title: 'Your account has been suspended',
      content: `Dear user,\nYour account has been suspended for ${payload.suspensionTime} for the following reason:\n${payload.reason}.\nThis suspension only applies to forum related activity. You can still make use of our other services until your suspension is lifted.\n\nStay healthy!!!`,
    });

    let days: number;
    if (payload.suspensionTime === '1 week') days = 7;
    else if (payload.suspensionTime === '1 month') days = 30;
    else days = 30 * 3;

    this.scheduleAction(`Unsuspend user`, days, async () => {
      await this.unsuspendUser(payload.id);
      await this.notificationsService.sendNotification({
        to: payload.id,
        title: 'Your account suspension has been lifted',
        content: `Dear user,\nYour account suspension has been lifted.\nYou can now make use of the forum to ask for and receive health tips from the community.\nPlease, make sure to adhere to the community rules and regulations. Failure to do so can result in a longer account suspension time.\n\nStay healthy!!!`,
      });
    });
  }

  scheduleAction(name: string, days: number, callback: () => void) {
    const timeout = setTimeout(callback, 1000 * 60 * 60 * 24 * days);
    this.schedulerRegistry.addTimeout(name, timeout);
  }
}
