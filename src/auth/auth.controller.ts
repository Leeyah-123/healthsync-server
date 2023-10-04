import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/utils/common/interfaces';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { AuthGuard } from './guards';

@Controller('auth')
@ApiTags('Authentication (login, signup and profile)')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req: RequestWithUser) {
    return this.authService.profile(req.user.email);
  }
}
