import { Module } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UsersService } from './users.service';

const prisma = new PrismaClient();

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
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

  // async addUser(): Promise<User> {
  // }

  // async updateUser(): Promise<User> {}

  // async deleteUser(): Promise<User> {
  // }
}
