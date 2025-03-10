import { ApiProperty } from '@nestjs/swagger';
import { OrderState } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';
import { DateField } from 'libs/utils';

export class StatsOrderDto {
  @ApiProperty({
    description: 'state order, default is OrderState.COMPLETED',
    example: OrderState.COMPLETED,
    enum: OrderState,
    enumName: 'OrderState',
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderState)
  state?: OrderState = OrderState.COMPLETED;

  @ApiProperty({
    description: 'List order id, default is all',
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

  @ApiProperty({
    description: 'The UTC offset time zone default is 7',
    example: 7,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  utcOffset: number = 7;

  @ApiProperty({
    description: 'Start time',
    example: '2025-03-07 15:42:15.490',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @DateField()
  startTime: Date;

  @ApiProperty({
    description: 'End time',
    example: '2025-03-06 15:42:15.490',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @DateField()
  endTime: Date;
}
