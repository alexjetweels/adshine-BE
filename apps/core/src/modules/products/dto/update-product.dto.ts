import { ApiProperty, PartialType } from '@nestjs/swagger';
import { StatusProduct } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'inactive product',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusProduct)
  status?: StatusProduct;
}
