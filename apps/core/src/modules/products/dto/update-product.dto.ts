import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { StatusProduct } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['categoryId']),
) {
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
