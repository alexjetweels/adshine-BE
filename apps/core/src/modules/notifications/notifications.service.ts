import { HttpStatus, Injectable } from '@nestjs/common';
import { NotificationStatus, Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { schemaPaging } from 'libs/utils/util';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ListNotificationDto } from './dto/list-notifation.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiException } from 'libs/utils/exception';
import { ErrorCode } from 'libs/utils/enum';
import e from 'express';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    return this.prismaService.notification.create({
      data: {
        ...createNotificationDto,
        createBy: user.id,
      },
    });
  }

  async findAll(listNotificationDto: ListNotificationDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    if (user.role !== Role.ADMIN) {
      listNotificationDto.status = NotificationStatus.SHOW;
    }

    const where = {} as { OR?: object[]; status?: NotificationStatus };

    if (listNotificationDto.search) {
      where.OR = [
        {
          title: { contains: listNotificationDto.search, mode: 'insensitive' },
        },
        {
          content: {
            contains: listNotificationDto.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (listNotificationDto.status) {
      where.status = listNotificationDto.status;
    }

    const records = await this.prismaService.notification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        content: true,
        type: true,
        status: true,
        iconType: true,
        createdAt: true,
        updatedAt: true,
        create: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      take: listNotificationDto.limit,
      skip: (listNotificationDto.page - 1) * listNotificationDto.limit,
    });

    const total = await this.prismaService.notification.count({ where });

    return schemaPaging({
      data: records,
      page: listNotificationDto.page,
      limit: listNotificationDto.limit,
      totalPage: Math.ceil(total / listNotificationDto.limit),
      totalItems: total,
    });
  }

  async findOne(id: string) {
    return this.prismaService.notification.findUnique({ where: { id } });
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.findOne(id);

    if (!notification) {
      throw new ApiException(
        'Thông báo không tồn tại',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    await this.prismaService.notification.update({
      where: { id },
      data: updateNotificationDto as Prisma.NotificationUpdateInput,
    });

    return updateNotificationDto;
  }

  async findUserNotifications(listNotificationDto: ListNotificationDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const where = { userId: user.id } as Prisma.UserNotificationWhereInput;

    const records = await this.prismaService.userNotification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: listNotificationDto.limit,
      skip: (listNotificationDto.page - 1) * listNotificationDto.limit,
    });

    const total = await this.prismaService.userNotification.count({ where });

    return schemaPaging({
      data: records,
      page: listNotificationDto.page,
      limit: listNotificationDto.limit,
      totalPage: Math.ceil(total / listNotificationDto.limit),
      totalItems: total,
    });
  }
}
