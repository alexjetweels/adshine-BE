import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { GroupRole, GroupType, Role, StatusGroup, User } from '@prisma/client';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ApiException } from 'libs/utils/exception';
import { ErrorCode } from 'libs/utils/enum';
import { ListGroupDto } from './dto/list-group.dto';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { StatusUserGroup } from '@prisma/client';
import { schemaPaging } from 'libs/utils/util';
import { create, map } from 'lodash';

@Injectable()
export class GroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkUserInDatabase(userIds: number[]) {
    return this.prismaService.user.count({
      where: {
        id: {
          in: userIds,
        },
        isBan: false,
      },
    });
  }

  async create({
    managerIds,
    groupIdsSupport,
    ...createGroupDto
  }: CreateGroupDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const countUsers = await this.checkUserInDatabase(managerIds);

    if (countUsers !== managerIds.length) {
      throw new ApiException(
        'User manager not found in database',
        HttpStatus.BAD_GATEWAY,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (groupIdsSupport?.length) {
      const countGroups = await this.prismaService.group.count({
        where: {
          id: {
            in: groupIdsSupport,
          },
          type: GroupType.ORDER,
        },
      });

      if (countGroups !== groupIdsSupport.length) {
        throw new ApiException(
          'Group order support not found in database',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    return await this.prismaService.$transaction(async (prisma) => {
      const newGroup = await prisma.group.create({
        data: {
          ...createGroupDto,
          createBy: user.id,
          users: {
            create: managerIds.map((userId) => ({
              userId,
              role: GroupRole.MANAGER,
              createBy: user.id,
            })),
          },
          supportOrderGroup: {
            create: groupIdsSupport?.map((groupId) => ({
              orderGroupId: groupId,
            })),
          },
        },
        include: {
          users: true,
          supportOrderGroup: true,
        },
      });

      return newGroup;
    });
  }

  async findAll(listGroupDto: ListGroupDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const where = {} as {
      OR?: object[];
      users?: {
        some: {
          userId: bigint;
          status: StatusUserGroup;
        };
      };
      status?: StatusGroup;
    };

    if (listGroupDto.search) {
      where.OR = [
        {
          name: {
            contains: listGroupDto.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: listGroupDto.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (
      user.role !== Role.ADMIN &&
      !user.permissions?.includes(PERMISSION_KEYS.GROUP_VIEW)
    ) {
      where.users = {
        some: {
          userId: user.id,
          status: StatusUserGroup.ACTIVE,
        },
      };
    }

    if (listGroupDto.status) {
      where.status = listGroupDto.status;
    }

    const records = await this.prismaService.group.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
      take: listGroupDto.limit,
      skip: (listGroupDto.page - 1) * listGroupDto.limit,
    });

    const total = await this.prismaService.group.count({ where });

    return schemaPaging({
      data: records,
      page: listGroupDto.page,
      limit: listGroupDto.limit,
      totalPage: Math.ceil(total / listGroupDto.limit),
      totalItems: total,
    });
  }

  async findOne(id: string) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const where = {} as {
      users?: {
        some: {
          userId: bigint;
          status: StatusUserGroup;
        };
      };
    };

    if (
      user.role !== Role.ADMIN &&
      !user.permissions?.includes(PERMISSION_KEYS.GROUP_VIEW)
    ) {
      where.users = {
        some: {
          userId: user.id,
          status: StatusUserGroup.ACTIVE,
        },
      };
    }

    const group = (await this.prismaService.group.findFirst({
      where: {
        id: id,
        ...where,
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        users: {
          select: {
            userId: true,
            status: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        supportOrderGroup: {
          select: {
            orderGroup: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })) as any;

    if (group && group.supportOrderGroup) {
      group.supportOrderGroup = group.supportOrderGroup?.map(
        (sog: any) => sog.orderGroup,
      );
    }

    return group;
  }

  update(id: string, updateGroupDto: UpdateGroupDto) {
    return updateGroupDto;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
