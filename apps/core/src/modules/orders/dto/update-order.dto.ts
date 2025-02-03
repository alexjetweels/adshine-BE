import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusOrder } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'remove order',
    example: 'INACTIVE',
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusOrder)
  status?: StatusOrder;
}
