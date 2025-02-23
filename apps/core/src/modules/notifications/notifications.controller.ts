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
import { Auth } from 'libs/utils';
import { RoleType } from 'libs/utils/enum';
import { ApiResponseCustom } from 'libs/utils/decorators/response-customer.decorator';
import {
  responseCreateNotificationSuccess,
  responseListNotificationSuccess,
} from './response/schema';
import { ListNotificationDto } from './dto/list-notifation.dto';

@CoreControllers({
  path: 'notifications',
  version: '1',
  tag: 'Notification',
})
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Auth([RoleType.ADMIN])
  @Post()
  @ApiResponseCustom([responseCreateNotificationSuccess])
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Auth()
  @Get()
  @ApiResponseCustom([responseListNotificationSuccess])
  @HttpCode(HttpStatus.OK)
  findAll(@Query() listNotificationDto: ListNotificationDto) {
    return this.notificationsService.findAll(listNotificationDto);
  }

  @Auth([RoleType.ADMIN])
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }
}
