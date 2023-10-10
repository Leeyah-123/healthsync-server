import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { comparePassword, hashPassword } from 'src/utils/password.bcrypt';
import { LoginDto, SignupDto } from './dto';
import TokenResponseEntity from './entities/token-response.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto): Promise<TokenResponseEntity> {
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
    return this.tokenResponder(user.id);
  }

  async login(dto: LoginDto): Promise<TokenResponseEntity> {
    const user = await this.usersService.findUserByEmail(dto.email);
    if (!user) throw new BadRequestException('Invalid email');

    // compare supplied password to password hash stored in database
    const isCorrectPassword: boolean = await comparePassword(
      dto.password,
      user.password,
    );

    if (!isCorrectPassword)
      throw new BadRequestException('Invalid username or password');

    return this.tokenResponder(user.id);
  }

  async profile(id: string): Promise<Omit<User, 'password'>> {
    const user: Partial<User> | null = await this.usersService.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    delete user.password;
    return user as Omit<User, 'password'>;
  }

  generateToken(payload: object): string {
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
  }

  tokenResponder(id: string) {
    const token = this.generateToken({ id });
    return { token };
  }
}
