import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards';
import { RequestWithUser } from 'src/utils/common';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [NotificationEntity],
    description: 'All notifications for current user',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'User not found',
  })
  getNotifications(@Req() req: RequestWithUser) {
    return this.notificationsService.getUserNotifications(req.user.id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @ApiParam({
    name: 'id',
    type: 'string',
    example: 'clnjakgsx0000f5klt4ttkqbj',
    description: 'ID of notification',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NotificationEntity,
    description: 'Updated notification record',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: NotFoundException,
    description: 'User not found or Notification not found',
  })
  viewNotification(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.notificationsService.viewNotification(req.user.id, req.user.id);
  }
}
