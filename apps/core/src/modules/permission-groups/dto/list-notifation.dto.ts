import { ApiProperty } from '@nestjs/swagger';
import { StatusPermissionGroup } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'libs/utils/dto/base-query.dto';

export class ListPermissionGroupDto extends BaseQueryDto {
  @ApiProperty({
    description: 'Active or inactive permission group',
    example: StatusPermissionGroup.ACTIVE,
    enum: StatusPermissionGroup,
    enumName: 'StatusPermissionGroup',
  })
  @IsOptional()
  @IsEnum(StatusPermissionGroup)
  status?: StatusPermissionGroup = StatusPermissionGroup.ACTIVE;
}
