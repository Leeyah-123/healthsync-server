import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: TokenResponseEntity,
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TokenResponseEntity,
  })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
  })
  profile(@Request() req: RequestWithUser) {
    return this.authService.profile(req.user.id);
  }
}
