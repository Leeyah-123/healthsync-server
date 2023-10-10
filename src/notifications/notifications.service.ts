import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Notification, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class NotificationsService {
  async getUserNotifications(id: string): Promise<Notification[]> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return prisma.notification.findMany({
      where: { userId: id },
    });
  }

  getNotificationById(id: string): Promise<Notification | null> {
    return prisma.notification.findUnique({ where: { id } });
  }

  async viewNotification(id: string, userId: string): Promise<Notification> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const notification = await this.getNotificationById(id);
    if (!notification) throw new NotFoundException('Notification not found');

    if (notification.viewed)
      throw new BadRequestException('Notification already viewed');

    return prisma.notification.update({
      where: { id, userId },
      data: {
        viewed: true,
      },
    });
  }

  sendNotification({
    to,
    title,
    content,
  }: {
    to: string;
    title: string;
    content: string;
  }): Promise<Notification> {
    const user = prisma.user.findUnique({ where: { id: to } });
    if (!user) throw new NotFoundException('User not found');

    return prisma.notification.create({
      data: {
        userId: to,
        title,
        content,
      },
    });
  }
}
