import { ApiProperty } from '@nestjs/swagger';
import { StatusProduct } from '@prisma/client';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class ListProductDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Category ID of the product',
    example: 1,
    required: true,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiProperty({
    description: 'inactive product',
    example: StatusProduct.ACTIVE,
    enum: StatusProduct,
    enumName: 'StatusProduct',
  })
  @IsOptional()
  @IsEnum(StatusProduct)
  status: StatusProduct = StatusProduct.ACTIVE;
}
