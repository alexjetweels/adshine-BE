import { ApiProperty } from '@nestjs/swagger';
import { NotificationStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class ListNotificationDto extends BaseQueryDto {
  @ApiProperty({
    description: 'how, hide notification',
    example: 'SHOW',
    enum: NotificationStatus,
    enumName: 'NotificationStatus',
  })
  @IsOptional()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;
}
