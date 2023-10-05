import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { comparePassword, hashPassword } from 'src/utils/password.bcrypt';
import { AuthResponse, Role } from 'src/utils/common';
import { LoginDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponse> {
    let user = await this.usersService.findUserByEmail(dto.email);
    if (user) throw new BadRequestException('Email already taken');

    if (dto.username) {
      user = await this.usersService.findUserByUsername(dto.username);

      if (user) throw new BadRequestException('Username already taken');
    }

    // hash password before saving
    dto.password = await hashPassword(dto.password);
    user = await this.usersService.addUser(dto);

    // return jwt secret
    return this.tokenResponder(user.email, 'user');
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findUserByEmail(dto.email);
    if (!user) throw new BadRequestException('Invalid email');

    // compare supplied password to password hash stored in database
    const isCorrectPassword: boolean = await comparePassword(
      dto.password,
      user.password,
    );

    if (!isCorrectPassword)
      throw new BadRequestException('Invalid username or password');

    return this.tokenResponder(user.id, 'user');
  }

  async profile(email: string): Promise<Omit<User, 'password'>> {
    const user: Partial<User> = await this.usersService.findUserByEmail(email);

    delete user.password;
    return user as Omit<User, 'password'>;
  }

  generateToken(payload: object): string {
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  tokenResponder(id: string, role: Role) {
    const token = this.generateToken({ id, role });
    return { token };
  }
}
