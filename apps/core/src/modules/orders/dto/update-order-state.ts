import { ApiProperty } from '@nestjs/swagger';
import { OrderState } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderStateDto {
  @ApiProperty({
    description: 'Update order state',
    example: OrderState.PRODUCT_DELIVERED,
    required: true,
    enum: OrderState,
    enumName: 'OrderState',
  })
  @IsNotEmpty()
  @IsEnum([
    OrderState.CANCELED,
    OrderState.PRODUCT_DELIVERED,
    OrderState.COMPLETED,
  ])
  state: OrderState;
}
