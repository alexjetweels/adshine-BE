import { ApiProperty } from '@nestjs/swagger';
import { GroupType, StatusGroup } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
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

  @ApiProperty({
    description: 'Group type',
    example: GroupType.ORDER,
    required: false,
    enum: GroupType,
    enumName: 'GroupType',
  })
  @IsOptional()
  @IsEnum(GroupType)
  type: GroupType;

  @ApiProperty({
    description: 'Tìm ra những group suport cho 1 groupId order',
    example: '46097793-3017-4a8f-bfa1-069e29dbd870',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsUUID('4')
  orderGroupId?: string;
}
