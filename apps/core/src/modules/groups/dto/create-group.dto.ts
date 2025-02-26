import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { GroupType } from '@prisma/client';

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
    description: 'Group type',
    example: GroupType.ORDER,
    required: false,
    enum: GroupType,
    enumName: 'GroupType',
  })
  @IsNotEmpty()
  @IsEnum(GroupType)
  type: GroupType;

  @ApiProperty({
    description: 'List manager user id',
    example: ['46097793-3017-4a8f-bfa1-069e29dbd870'],
    required: true,
    type: [String],
  })
  @ValidateIf((cgd: CreateGroupDto) => {
    if (cgd.type !== GroupType.SUPPORT) {
      delete cgd.groupIdsSupport;
    }

    return true;
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value }: { value: string[] }): string[] => {
    return Array.from(new Set(value)).map((v: any): string => v as string);
  })
  @IsUUID('4', { each: true })
  groupIdsSupport?: string[];

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
