import { User } from '@prisma/client';

export interface JwtPayload {
  id: string;
  iad: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
