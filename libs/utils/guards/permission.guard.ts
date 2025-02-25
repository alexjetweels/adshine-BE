import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { KeyPermissionDefaultType } from 'libs/modules/init-data/init';
import { isEmpty } from 'lodash';
import { RoleType } from '../enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<KeyPermissionDefaultType[]>(
      'permissions',
      context.getHandler(),
    );

    if (isEmpty(permissions)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

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
