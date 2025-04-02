import { ApiProperty } from '@nestjs/swagger';
import { OrderState, StatusOrder } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
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

  @ApiProperty({
    description: 'My order created',
    example: false,
    required: false,
  })
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  @IsBoolean()
  isMyOrder?: boolean;

  @ApiProperty({
    description: 'Search by user',
    example: 1,
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number;

  @ApiProperty({
    description: 'Search by product',
    example: 1,
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  @Min(1)
  productId: bigint;

  @ApiProperty({
    description: 'Search by category',
    example: 1,
    required: false,
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId: bigint;

  @ApiProperty({
    description: 'state order',
    example: OrderState.COMPLETED,
    enum: OrderState,
    enumName: 'OrderState',
  })
  @IsOptional()
  @IsEnum(OrderState)
  state?: OrderState;
}
