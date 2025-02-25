import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StatusProduct } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateProductCategoriesDto } from './create-product-categories.dto copy';

export class UpdateProductCategoriesDto extends PartialType(CreateProductCategoriesDto) {
  @ApiProperty({
    description: 'inactive product',
    example: 'INACTIVE',
    required: false,
    enum: StatusProduct,
    enumName: 'StatusProduct',
  })
  @IsOptional()
  @IsEnum(StatusProduct)
  status?: StatusProduct;
}
