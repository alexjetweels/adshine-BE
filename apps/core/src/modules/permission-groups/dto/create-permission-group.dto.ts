import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength
} from 'class-validator';
import {
  KeyPermissionDefaultType,
  PERMISSION_DEFAULT
} from 'libs/modules/init-data/init';

export class CreatePermissionGroupDto {
  @ApiProperty({
    description: 'The name of the permission group',
    example: 'Example Name',
    required: true,
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The description of the permission group',
    example: 'Example Description',
    required: false,
  })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Permission ids',
    example: Object.keys(PERMISSION_DEFAULT),
    required: true,
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(Object.keys(PERMISSION_DEFAULT), { each: true })
  @Type(() => String)
  @Transform(({ value }: { value: any[] }): KeyPermissionDefaultType[] => {
    return Array.from(new Set(value)).map(
      (v: any): KeyPermissionDefaultType => v as KeyPermissionDefaultType,
    );
  })
  permissionIds: KeyPermissionDefaultType[];
}
