import { ApiProperty } from '@nestjs/swagger';
import { StatusProduct } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class ListProductCategoriesDto extends BaseQueryDto {
  @ApiProperty({
    description: 'inactive product',
    example: true,
    enum: StatusProduct,
    enumName: 'StatusProduct',
  })
  @IsOptional()
  @IsEnum(StatusProduct)
  status: StatusProduct = StatusProduct.ACTIVE;
}
