import { ApiProperty } from '@nestjs/swagger';
import { PostStatus, PostType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class ListPostDto extends BaseQueryDto {
  @ApiProperty({
    description: 'how, hide notification',
    example: 'SHOW',
    enum: PostStatus,
    enumName: 'PostStatus',
  })
  @IsOptional()
  @IsEnum(PostStatus)
  status: PostStatus;

  @ApiProperty({
    description: 'how, hide notification',
    example: 'SHOW',
    enum: PostType,
    enumName: 'PostType',
  })
  @IsOptional()
  @IsEnum(PostType)
  type: PostType;
}
