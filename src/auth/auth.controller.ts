import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { RequestWithUser } from 'src/utils/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import TokenResponseEntity from './entities/token-response.entity';
import { AuthGuard } from './guards';

@Controller('auth')
@ApiTags('Authentication (login, signup and profile)')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    type: TokenResponseEntity,
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @ApiResponse({
    status: 200,
    type: TokenResponseEntity,
  })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  profile(@Request() req: RequestWithUser) {
    return this.authService.profile(req.user.email);
  }
}
