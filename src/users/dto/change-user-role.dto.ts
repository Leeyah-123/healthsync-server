import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class ChangeUserRoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    description: "User's id",
  })
  userId: string;

  @IsNotEmpty()
  @IsIn(['user', 'moderator', 'admin'])
  @ApiProperty({
    type: 'string',
    description: 'New Role: either "user", "moderator" or "admin"',
  })
  role: Role;
}
