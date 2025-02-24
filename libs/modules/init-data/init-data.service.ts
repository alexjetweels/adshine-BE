import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CoreConfigService } from 'apps/core/src/modules/config/core-config.service';
import { AuthService } from 'apps/core/src/modules/auth/services/auth.service';
import { PERMISSION_DEFAULT, PermissionDefaultType } from './init';

@Injectable()
export class InitDataService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: CoreConfigService,
    private readonly authService: AuthService,
  ) {}

  async initCore() {
    await this.initAdmin();
    await this.initPermissions();
    return;
  }

  async initAdmin() {
    const existingUser = await this.authService.getUserByEmail(
      this.configService.authentication.adminEmail,
    );

    if (existingUser) {
      return;
    }

    await this.authService.register(
      {
        email: this.configService.authentication.adminEmail,
        name: 'Admin',
        password: this.configService.authentication.adminPassword,
      },
      { isAdmin: true },
    );
  }

  async initPermissions() {
    const permissions = await this.prismaService.permission.findMany();
    const existingPermissions = permissions.map((p) => p.id);
    const permissionDefault = Object.keys(PERMISSION_DEFAULT) as Array<
      keyof PermissionDefaultType
    >;

    const newPermissions = permissionDefault.filter(
      (p) => !existingPermissions.includes(p),
    );

    await this.prismaService.permission.createMany({
      data: newPermissions.map((p) => ({
        id: p,
        description: PERMISSION_DEFAULT[p].description,
      })),
    });
  }
}
