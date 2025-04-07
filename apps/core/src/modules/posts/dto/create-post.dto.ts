import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title',
    example: 'Example Title',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'The content',
    example: 'Example Content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content: string;

  @ApiProperty({
    description: 'The type',
    example: PostType.TIP,
    required: true,
    enum: PostType,
    enumName: 'PostType',
  })
  @IsNotEmpty()
  @IsEnum(PostType)
  type: PostType;

  @ApiProperty({
    description: 'The status',
    example: PostStatus.HIDE,
    required: false,
    enum: PostStatus,
    enumName: 'PostStatus',
  })
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  //icon type
  @ApiProperty({
    description: 'The icon type',
    example: 'Example Icon Type',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  iconType?: string;

  //icon url
  @ApiProperty({
    description: 'The icon url',
    example: 'Example Icon Url',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  iconUrl?: string;
}
