import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ForumModule } from './forum/forum.module';
import { WorkoutPlanModule } from './workout_plan/workout_plan.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, ForumModule, WorkoutPlanModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
