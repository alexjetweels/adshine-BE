import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class OrderItemDto {
  @ApiProperty({
    description: 'The product ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  productId: bigint;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty({
    description: 'The price of the product',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  price?: number;
}
export class CreateOrderDto {
  @ApiProperty({
    description: 'The total price of the order',
    example: 1000,
  })
  @IsNotEmpty()
  @IsInt()
  totalPrice: number;

  @ApiProperty({
    description: 'data order items',
    example: {
      productId: 1,
      quantity: 2,
      price: 1000,
    },
    type: () => OrderItemDto,
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

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
    description: 'The description of the order',
    example: 'This is an example order description.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'User support id',
    example: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  staffSupportId?: number;

  @ApiProperty({
    description: 'Group id suport order',
    example: '46097793-3017-4a8f-bfa1-069e29dbd870',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID('4')
  groupSupportId?: string;
}
