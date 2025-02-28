import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class StaffGroupDto {
  @ApiProperty({
    description: 'User id',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: 'Leader id (required leaderId is leader group)',
    example: 2,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  leaderId: number;

  @ApiProperty({
    description: 'List group id, required group order in main group',
    example: ['46097793-3017-4a8f-bfa1-069e29dbd870'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Transform(({ value }: { value: string[] }): string[] => {
    return Array.from(new Set(value)).map((v: any): string => v as string);
  })
  @IsUUID('4', { each: true })
  groupIdsSupport?: string[];
}

export class UpdateGroupDto extends PartialType(
  OmitType(CreateGroupDto, ['type']),
) {
  @ApiProperty({
    description: 'List group id',
    example: ['46097793-3017-4a8f-bfa1-069e29dbd870'],
    required: false,
    type: [String],
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
    description: 'List leader id',
    example: [1, 2],
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Transform(({ value }: { value: number[] }): number[] => {
    return Array.from(new Set(value)).map((v: any): number => v as number);
  })
  leaderIds: number[] = [];

  @ApiProperty({
    description: 'List staff assign to group',
    example: [
      { userId: 1, managerId: 2 },
      { userId: 3, managerId: 4 },
    ],
    required: false,
    type: [StaffGroupDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StaffGroupDto)
  staff?: StaffGroupDto[] = [];
}
