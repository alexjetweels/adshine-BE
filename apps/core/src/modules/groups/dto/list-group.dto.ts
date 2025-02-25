import { ApiProperty } from '@nestjs/swagger';
import { StatusGroup } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class ListGroupDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Active or inactive permission group',
    example: StatusGroup.ACTIVE,
    enum: StatusGroup,
    enumName: 'StatusGroup',
  })
  @IsOptional()
  @IsEnum(StatusGroup)
  status?: StatusGroup = StatusGroup.ACTIVE;
}
