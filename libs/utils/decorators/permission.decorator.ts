import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../enum';
import { KeyPermissionDefaultType } from 'libs/modules/init-data/init';

export const Permissions = (permissions: KeyPermissionDefaultType[]) =>
  SetMetadata('permissions', permissions);
