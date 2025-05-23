import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CoreControllers } from 'libs/utils/decorators/controller-customer.decorator';
import { Auth, AuthV2 } from 'libs/utils';
import { RoleType } from 'libs/utils/enum';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreateNotificationSuccess,
  responseListNotificationSuccess,
} from './response/schema';
import { ListNotificationDto } from './dto/list-notifation.dto';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';

@CoreControllers({
  path: 'notifications',
  version: '1',
  tag: 'Notification',
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @AuthV2([PERMISSION_KEYS.NOTIFICATION_CREATE])
  @Post()
  @ApiResponseCustom([responseCreateNotificationSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @AuthV2()
  @Get()
  @ApiResponseCustom([responseListNotificationSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listNotificationDto: ListNotificationDto) {
    return this.notificationsService.findAll(listNotificationDto);
  }

  @AuthV2([PERMISSION_KEYS.NOTIFICATION_CREATE])
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @AuthV2()
  @Get('my-notifications')
  @ApiResponseCustom([responseListNotificationSuccess])
  @HttpCode(HttpStatus.OK)
  findUserNotifications(@Query() listNotificationDto: ListNotificationDto) {
    return this.notificationsService.findUserNotifications(listNotificationDto);
  }
}
