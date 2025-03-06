import { HttpStatus, Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ErrorCode } from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { generateHash, randomPassword, schemaPaging } from 'libs/utils/util';
import { map, omit } from 'lodash';
import { CoreCreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { CoreUpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(userId: number) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        isBan: true,
        createdAt: true,
        role: true,
        UserPermissionGroup: {
          select: {
            permissionGroup: {
              select: {
                id: true,
                name: true,
                permissions: {
                  select: {
                    permission: {
                      select: {
                        id: true,
                        description: true,
                      },
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
      throw new ApiException(
        'Người dùng không tồn tại',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    const permissionsUser = new Set<string>();
    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      isBan: user.isBan,
      createdAt: user.createdAt,
      role: user.role,
      permissionGroups: user.UserPermissionGroup.map((pg) => ({
        id: pg.permissionGroup.id,
        name: pg.permissionGroup.name,
        permissions: pg.permissionGroup.permissions.map((p) => {
          permissionsUser.add(p.permission.id);
          return {
            id: p.permission.id,
            description: p.permission.description,
          };
        }),
      })),
    };

    if (data.role !== Role.ADMIN) {
      const userGroup = await this.prismaService.userGroup.findMany({
        where: { userId: userId },
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

      Object.assign(data, { userGroup });
    }

    return { ...data, permissionsUser: Array.from(permissionsUser) };
  }

  async getUserInfo() {
    const user = ContextProvider.getAuthUser<AuthUser>();

    return {
      ...omit(user, ['password']),
    };
  }

  async getListUser(query: ListUserDto) {
    const where = {
      role: Role.USER,
    } as { role: Role; details?: object; email?: object; OR?: object[] };

    if (query.search) {
      where.OR = [
        { email: { contains: query.search, mode: 'insensitive' } },
        { name: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const records = await this.prismaService.user.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
      include: {
        UserGroup: {
          select: {
            id: true,
          },
        },
      },
    });

    const total = await this.prismaService.user.count({ where });

    const users = map(records, (record) => {
      return {
        id: record.id,
        email: record.email,
        name: record.name,
        isBan: record.isBan,
        createdAt: record.createdAt,
        isJoinGroup: record.UserGroup.length > 0,
      };
    });

    return schemaPaging({
      data: users,
      page: query.page,
      limit: query.limit,
      totalPage: Math.ceil(total / query.limit),
      totalItems: total,
    });
  }

  async getUserByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  async createUser({ permissionGroupIds, ...body }: CoreCreateUserDto) {
    const user = ContextProvider.getAuthUser<User>();
    const existingUser = await this.getUserByEmail(body.email);

    if (existingUser) {
      throw new ApiException(
        'Nguời dùng đã tồn tại',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const password = randomPassword();
    const hashedPassword = generateHash(password);
    const data = {
      email: body.email,
      password: hashedPassword,
      name: body.name || 'Default Name',
    };

    return this.prismaService.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data,
      });

      if (permissionGroupIds?.length) {
        const permissionGroups = await prisma.permissionGroup.count({
          where: {
            id: {
              in: permissionGroupIds,
            },
          },
        });

        if (permissionGroups !== permissionGroupIds.length) {
          throw new ApiException(
            'Nhóm quyền không tồn tại',
            HttpStatus.BAD_REQUEST,
            ErrorCode.INVALID_INPUT,
          );
        }

        await prisma.userPermissionGroup.createMany({
          data: permissionGroupIds.map((permissionGroupId) => ({
            userId: newUser.id,
            permissionGroupId,
            createBy: user.id,
          })),
        });
      }

      return { ...data, password };
    });
  }

  async updateUser(
    userId: number,
    { permissionGroupIds, ...body }: CoreUpdateUserDto,
  ) {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        role: Role.USER,
      },
    });

    if (!existingUser) {
      throw new ApiException(
        'Người dùng không tồn tại',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }
    const data = {
      email: body.email,
      name: body.name,
      isBan: body.isBan,
    };
    let newPassword: string;

    if (body.email) {
      const existingUserEmail = await this.prismaService.user.findFirst({
        where: {
          email: body.email,
          role: Role.USER,
          id: {
            not: userId,
          },
        },
      });

      if (existingUserEmail) {
        throw new ApiException(
          'Email đã tồn tại',
          HttpStatus.BAD_REQUEST,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    if (body.isResetPassword) {
      const password = randomPassword();
      newPassword = password;
      const hashedPassword = generateHash(password);
      Object.assign(data, { password: hashedPassword });
    }

    return this.prismaService.$transaction(async (prisma) => {
      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data,
      });

      if (permissionGroupIds?.length) {
        const permissionGroups = await prisma.permissionGroup.count({
          where: {
            id: {
              in: permissionGroupIds,
            },
          },
        });

        if (permissionGroups !== permissionGroupIds.length) {
          throw new ApiException(
            'Nhóm quyền không tồn tại',
            HttpStatus.BAD_REQUEST,
            ErrorCode.INVALID_INPUT,
          );
        }

        await prisma.userPermissionGroup.deleteMany({
          where: {
            userId,
          },
        });

        await prisma.userPermissionGroup.createMany({
          data: permissionGroupIds.map((permissionGroupId) => ({
            userId,
            permissionGroupId,
            createBy: user.id,
          })),
        });
      }

      return { ...user, password: newPassword };
    });
  }
}
