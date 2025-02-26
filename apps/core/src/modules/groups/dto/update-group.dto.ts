import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateGroupDto extends PartialType(
  OmitType(CreateGroupDto, ['type']),
) {
  @ApiProperty({
    description: 'List manager user id',
    example: ['46097793-3017-4a8f-bfa1-069e29dbd870'],
    required: true,
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
    required: true,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @ArrayMinSize(1)
  @Transform(({ value }: { value: number[] }): number[] => {
    return Array.from(new Set(value)).map((v: any): number => v as number);
  })
  leaderIds: number[];
}
