import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['groupId', 'type']),
) {
  @ApiProperty({
    description: 'remove order',
    example: StatusOrder.INACTIVE,
    required: false,
    enum: StatusOrder,
    enumName: 'StatusOrder',
  })
  @IsOptional()
  @IsEnum(StatusOrder)
  status?: StatusOrder;
}
