import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from './dto';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findUserById(id: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: {
        username,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  }

  async addUser(dto: CreateUserDto): Promise<User> {
    return prisma.user.create({
      data: {
        ...dto,
        currentWeight: dto.weight,
        weightHistory: {},
      },
    });
  }

  // TODO: Update user current weight and weight history
  // async updateUserWeight(): Promise<User> {

  // }

  // TODO: Suspend user for specific period of time
  async suspendUser(id: string): Promise<User> {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        suspended: true,
      },
    });
  }
}
