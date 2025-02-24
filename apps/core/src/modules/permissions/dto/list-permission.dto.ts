import { StringFieldOptional } from 'libs/utils';

// export class ListPermissionDto extends BaseQueryDto {}
export class ListPermissionDto {
  @StringFieldOptional()
  search?: string;
}
