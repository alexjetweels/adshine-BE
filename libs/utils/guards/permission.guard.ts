import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  KeyPermissionDefaultType,
  PERMISSION_KEYS,
} from 'libs/modules/init-data/init';
import { isEmpty } from 'lodash';
import { RoleType } from '../enum';
import { PostType } from '@prisma/client';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const originalPermissions =
      this.reflector.get<KeyPermissionDefaultType[]>(
        'permissions',
        context.getHandler(),
      ) || [];

    const permissions = [...originalPermissions];

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (
      request.url.includes('/api/core/v1/posts') &&
      request.method === 'POST'
    ) {
      const keyPermission = {
        [PostType.TIP_TRICK]: PERMISSION_KEYS.POST_CREATE_TIP_TRICK,
        [PostType.DOCUMENT]: PERMISSION_KEYS.POST_CREATE_DOCUMENT,
        [PostType.SOFTWARE]: PERMISSION_KEYS.POST_CREATE_SOFTWARE,
      };

      const extraPermission = keyPermission[request.body.type as PostType];
      if (extraPermission) {
        permissions.push(extraPermission);
      }
    }

    if (isEmpty(permissions)) {
      return true;
    }

    if (user.role === RoleType.ADMIN) {
      return true;
    }

    const userPermissions = user.permissions;
    const checkPermissions = permissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!checkPermissions) {
      throw new ForbiddenException(
        `Bạn không có quyền thực hiện hành động này. Cần quyền: ${permissions.join(', ')}`,
      );
    }

    return true;
  }
}
