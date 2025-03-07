import { ApiProperty } from '@nestjs/swagger';
import { OrderState, StatusOrder } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class HistoryOrderDto extends BaseQueryDto {
  @ApiProperty({
    description: 'state order',
    example: OrderState.COMPLETED,
    enum: OrderState,
    enumName: 'OrderState',
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderState)
  state?: OrderState

  @ApiProperty({
    description: 'List order id',
    example: [1, 2],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Transform(({ value }: { value: number[] }): number[] => {
    return Array.from(new Set(value)).map((v: any): number => +v as number);
  })
  orderIds: number[];
}
