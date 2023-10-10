import { ApiProperty } from '@nestjs/swagger';

export class NotificationEntity {
  @ApiProperty({
    example: 'clnjakgsx0000f5klt4ttkqbj',
    description: 'Unique identifier for each notification',
  })
  id: string;

  @ApiProperty({
    example: 'clfytkysx0600f5klt4ttkqbj',
    description: 'ID of associated user',
  })
  userId: string;

  @ApiProperty({
    example: 'A new notification',
    description: 'Title of notification',
  })
  title: string;

  @ApiProperty({
    example: 'This notification contains important stuff',
    description: 'More information about the notification',
  })
  content: string;

  @ApiProperty({
    example: false,
    description: 'Whether or not the user has viewed this notification',
  })
  viewed: boolean;

  @ApiProperty({
    example: new Date(),
    description: 'Date notification was sent',
  })
  createdAt: Date;
}
