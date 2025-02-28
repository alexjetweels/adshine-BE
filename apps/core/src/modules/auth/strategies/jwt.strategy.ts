import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { TokenType } from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import { omit } from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CoreConfigService } from '../../config/core-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: CoreConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authentication.secret,
    });
  }

  async validate(args: { userId: number; role: Role; type: TokenType }) {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new ApiException('Unauthorize', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.prismaService.user.findFirst({
      where: { id: args.userId },
      select: {
        id: true,
        email: true,
        name: true,
        isBan: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        UserPermissionGroup: {
          select: {
            permissionGroup: {
              select: {
                permissions: {
                  select: {
                    permission: {
                      select: { id: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new ApiException('Unauthorize', HttpStatus.UNAUTHORIZED);
    }

    if (user.role !== Role.ADMIN) {
      const permissionsUser = Array.from(
        new Set(
          user.UserPermissionGroup.flatMap((pg) =>
            pg.permissionGroup.permissions.map((p) => p.permission.id),
          ),
        ),
      );
      Object.assign(user, { permissions: permissionsUser });

      const userGroup = await this.prismaService.userGroup.findMany({
        where: { userId: args.userId },
        select: {
          groupId: true,
          role: true,
          leaderId: true,
          status: true,
          group: {
            select: {
              name: true,
              type: true,
            },
          },
          userGroupSupport: {
            select: {
              groupSupportId: true,
            },
          },
        },
      });

      const dataGroupUser = userGroup.reduce(
        (acc, cur) => {
          acc[cur.groupId] = {
            role: cur.role,
            leaderId: cur.leaderId,
            group: cur.group,
            userGroupSupport: cur.userGroupSupport.map(
              (ugs) => ugs.groupSupportId,
            ),
          };
          return acc;
        },
        {} as Record<string, any>,
      );

      Object.assign(user, { dataGroups: dataGroupUser });
    }

    if (user.isBan) {
      throw new ApiException('User is banned', HttpStatus.FORBIDDEN);
    }

    return omit(user, ['UserPermissionGroup']);
  }
}
