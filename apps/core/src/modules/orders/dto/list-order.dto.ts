import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
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
}
