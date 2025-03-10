import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { GroupRole, GroupType, Role, StatusGroup } from '@prisma/client';
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
        where: { userId: args.userId, group: { status: StatusGroup.ACTIVE } },
        select: {
          groupId: true,
          role: true,
          leaderId: true,
          status: true,
          group: {
            select: {
              name: true,
              type: true,
              supportOrderGroup: {
                select: {
                  orderGroupId: true,
                },
              },
            },
          },
          userGroupSupport: {
            select: {
              groupSupportId: true,
            },
          },
        },
      });

      const {
        dataGroupUser,
        dataGroupIdsOrder,
        dataGroupIdsSupport,
        dataGroupIdsOrderSupport,
      } = userGroup.reduce(
        (acc, cur) => {
          acc.dataGroupUser[cur.groupId] = {
            role: cur.role,
            leaderId: cur.leaderId,
            group: cur.group,
            userGroupSupport: cur.userGroupSupport.map(
              (ugs) => ugs.groupSupportId,
            ),
          };
          if (cur.group.type === GroupType.ORDER) {
            acc.dataGroupIdsOrder.push(cur.groupId);
          }

          if (cur.group.type === GroupType.SUPPORT) {
            acc.dataGroupIdsSupport.push(cur.groupId);
            acc.dataGroupIdsOrderSupport.push(
              ...(acc.dataGroupUser[cur.groupId]?.userGroupSupport || []),
            );

            if (cur.role === GroupRole.MANAGER) {
              acc.dataGroupIdsOrderSupport.push(
                ...(cur.group?.supportOrderGroup?.map(
                  (sog) => sog.orderGroupId,
                ) || []),
              );
            }
          }
          return acc;
        },
        {
          dataGroupUser: {} as Record<string, any>,
          dataGroupIdsOrder: [] as string[],
          dataGroupIdsSupport: [] as string[],
          dataGroupIdsOrderSupport: [] as string[],
        },
      );

      Object.assign(user, {
        dataGroups: dataGroupUser,
        dataGroupIdsOrder,
        dataGroupIdsSupport,
        dataGroupIdsOrderSupport: Array.from(new Set(dataGroupIdsOrderSupport)),
      });
    }

    if (user.isBan) {
      throw new ApiException('Người dùng đang bị ban', HttpStatus.FORBIDDEN);
    }

    return omit(user, ['UserPermissionGroup']);
  }
}
