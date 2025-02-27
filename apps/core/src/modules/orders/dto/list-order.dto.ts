import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class ListOrderDto extends BaseQueryDto {
  @ApiProperty({
    description: 'inactive order',
    example: 'ACTIVE',
    enum: StatusOrder,
    enumName: 'StatusOrder',
  })
  @IsOptional()
  @IsEnum(StatusOrder)
  status: StatusOrder = StatusOrder.ACTIVE;

  @ApiProperty({
    description: 'Group id order',
    example: '46097793-3017-4a8f-bfa1-069e29dbd870',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID('4')
  groupId?: string;
}
