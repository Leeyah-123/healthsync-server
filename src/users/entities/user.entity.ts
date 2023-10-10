import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Like, Post, Role, WorkoutPlan } from '@prisma/client';

export class UserEntity {
  @ApiProperty({
    example: 'clnjakgsx0000f5klt4ttkqbj',
    description: 'Unique identifier for each user',
  })
  id: string;

  @ApiProperty({
    example: 'Aaliyah',
    description: "Associated user's first name",
  })
  firstName: string;

  @ApiProperty({
    example: 'Junaid',
    description: "Associated user's last name",
  })
  lastName: string;

  @ApiProperty({
    example: 'junaidaaliyah260@gmail.com',
    description: "Associated user's email address",
  })
  email: string;

  @ApiProperty({
    example: 'female',
    description: "Associated user's gender",
    enum: ['male', 'female'],
  })
  gender: string;

  @ApiPropertyOptional({
    example: 'Leeyah',
    description: 'Username of associated user',
  })
  username?: string;

  @ApiProperty({
    example: new Date(),
    description: 'Date user was created (i.e registration date)',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'user',
    description:
      'Role of associated user. Useful for role-based authorization in forum moderation',
    default: 'user',
    enum: ['user', 'moderator', 'admin'],
  })
  role: Role;

  @ApiProperty({
    example: 35,
    description: "User's current weight in kg",
  })
  currentWeight: number;

  @ApiProperty({
    example: {
      '2023-7-05T19:57:45.061Z': 25,
      '2023-8-05T19:57:45.061Z': 30,
      '2023-9-05T19:57:45.061Z': 32,
      '2023-10-05T19:57:45.061Z': 35,
    },
    description: "A mapping of dates to user's weight at specified date",
  })
  weightHistory: object;

  @ApiProperty({
    example: false,
    description:
      'Whether or not a user has been suspended by a forum moderator',
  })
  suspended: boolean;

  @ApiPropertyOptional({
    default: [],
    description: "Array of user's notifications",
  })
  notifications?: Notification[];

  @ApiPropertyOptional({
    default: [],
    description: "Array of user's workout plans",
  })
  workoutPlans?: WorkoutPlan[];

  @ApiPropertyOptional({
    default: [],
    description: "Array of user's posts in forum",
  })
  posts?: Post[];

  @ApiPropertyOptional({
    default: [],
    description: "Array of user's comments in forum",
  })
  comments?: Comment[];

  @ApiPropertyOptional({
    default: [],
    description: "Array of user's likes in forum",
  })
  likes?: Like[];
}
