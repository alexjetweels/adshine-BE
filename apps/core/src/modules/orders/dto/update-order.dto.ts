import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'remove order',
    example: 'INACTIVE',
    required: false,
    enum: StatusOrder,
    enumName: 'StatusOrder',
  })
  @IsOptional()
  @IsEnum(StatusOrder)
  status?: StatusOrder;
}
