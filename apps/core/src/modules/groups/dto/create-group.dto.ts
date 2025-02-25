import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    description: 'The name of the group',
    example: 'Admin',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'List manager user id',
    example: [1, 2],
    required: true,
    type: [Number],
  })
  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @ArrayMinSize(1)
  @Transform(({ value }: { value: number[] }): number[] => {
    return Array.from(new Set(value)).map((v: any): number => v as number);
  })
  managerIds: number[];

  @ApiProperty({
    description: 'The description of the group',
    example: 'Admin group',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
