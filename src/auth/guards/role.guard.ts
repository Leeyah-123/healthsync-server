import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
// Implements role based authorization, preventing users of certain roles from accessing a resource
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role: Role | null = this.reflector.get<Role>(
      'role',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    if (role && role === request.user?.role) return true;

    return false;
  }
}
