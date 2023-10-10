import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/decorators/role.decorator';
import { AuthGuard, RoleGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/utils/common';
import {
  ChangeUserRoleDto,
  SuspendUserDto,
  UpdateCalorieIntakeDto,
  UpdatePersonalInfoDto,
  UpdateWeightDto,
} from './dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: 'All stored users',
  })
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/{id}')
  @ApiParam({
    type: 'string',
    name: 'id',
    allowEmptyValue: false,
    description: 'ID of user',
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'User with associated ID',
  })
  getUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Patch('personal-info')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Updated user record',
  })
  @ApiResponse({
    status: 400,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundException,
    description: 'User Not Found',
  })
  updatePersonalInfo(
    @Req() req: RequestWithUser,
    @Body() dto: UpdatePersonalInfoDto,
  ) {
    return this.usersService.updatePersonalInfo(req.user.id, dto);
  }

  @Patch('weight')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Updated user record',
  })
  @ApiResponse({
    status: 400,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundException,
    description: 'User Not Found',
  })
  updateUserWeight(@Req() req: RequestWithUser, @Body() dto: UpdateWeightDto) {
    return this.usersService.updateUserWeight(req.user.id, dto.weight);
  }

  @Patch('calorie-intake')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Updated user record',
  })
  @ApiResponse({
    status: 400,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundException,
    description: 'User Not Found',
  })
  updateUserCalorieIntake(
    @Req() req: RequestWithUser,
    @Body() dto: UpdateCalorieIntakeDto,
  ) {
    return this.usersService.updateUserWeight(req.user.id, dto.calorieIntake);
  }

  @Patch('role')
  @Role('admin')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Updated user record',
  })
  @ApiResponse({
    status: 400,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundException,
    description: 'User Not Found',
  })
  changeUserRole(@Body() dto: ChangeUserRoleDto) {
    return this.usersService.changeUserRole(dto.userId, dto.role);
  }

  @Post('suspend')
  @Role('moderator')
  @UseGuards(AuthGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Updates user record',
  })
  @ApiResponse({
    status: 400,
    type: BadRequestException,
    description: 'Bad Request Exception',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundException,
    description: 'User Not Found',
  })
  suspendUser(@Body() dto: SuspendUserDto, @Req() req: RequestWithUser) {
    return this.usersService.suspendUser(req.user.id, dto);
  }
}
