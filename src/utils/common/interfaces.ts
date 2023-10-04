import { Role } from './types';

export interface JwtPayload {
  email: string;
  iad: number;
  role: Role;
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
