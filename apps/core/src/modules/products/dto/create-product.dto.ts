import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Category ID of the product',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  categoryId: number;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Example Product',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'This is an example product description.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @IsInt()
  price?: number;

  @ApiProperty({
    description: 'The available stock quantity of the product',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsInt()
  stock?: number;
}
