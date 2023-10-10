import { SetMetadata } from '@nestjs/common';
import { Role as RoleType } from '@prisma/client';

// This sets the role a user is required to have to access a specific route/resource
export const Role = (role: RoleType) => SetMetadata('role', role);
