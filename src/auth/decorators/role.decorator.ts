import { SetMetadata } from '@nestjs/common';
import { Role as RoleType } from 'src/utils/common/types';

export const Role = (role: RoleType) => SetMetadata('role', role);
