import { HttpStatus, Injectable } from '@nestjs/common';
import {
  GroupRole,
  GroupType,
  Prisma,
  Role,
  StatusGroup,
  StatusUserGroup,
  UserGroup,
} from '@prisma/client';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ErrorCode } from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { schemaPaging } from 'libs/utils/util';
import { CreateGroupDto } from './dto/create-group.dto';
import { ListGroupDto } from './dto/list-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

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

  async checkUserJoinOtherGroup(
    userIds: number[],
    optional?: { excludeGroupId?: string },
  ) {
    const result = await this.prismaService.$queryRaw`
      SELECT u.id AS userId, 
             EXISTS (
                 SELECT 1 FROM user_groups ug 
                 WHERE ug."userId" = u.id 
                 ${optional?.excludeGroupId ? Prisma.sql`AND ug."groupId" != ${optional.excludeGroupId}` : Prisma.empty}
                 LIMIT 1
             ) AS "isGroup"
      FROM users u
      WHERE u.id IN (${Prisma.join(userIds)});
    `;

    (result as any).forEach((user: any) => {
      if (user.isGroup) {
        throw new ApiException(
          'Tồn tại user đã tham gia group khác',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }
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

    await this.checkUserJoinOtherGroup(managerIds);

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

    const where = {} as Prisma.GroupWhereInput;

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

    if (listGroupDto.type) {
      where.type = listGroupDto.type;
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

  async findOne(id: string, { isView }: { isView?: boolean } = {}) {
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

    let select = {} as Prisma.GroupSelect;

    if (isView) {
      select = {
        id: true,
        name: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        users: {
          select: {
            userId: true,
            status: true,
            role: true,
            leaderId: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                isBan: true,
              },
            },
            userGroupSupport: {
              select: {
                groupSupportId: true,
              },
            },
          },
          orderBy: {
            role: 'asc',
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
      };
    } else {
      select = {
        id: true,
        status: true,
        type: true,
        users: {
          select: {
            userId: true,
            status: true,
            leaderId: true,
            role: true,
            user: {
              select: {
                id: true,
              },
            },
            userGroupSupport: {
              select: {
                groupSupportId: true,
              },
            },
          },
          orderBy: {
            role: 'asc',
          },
        },
        supportOrderGroup: {
          select: {
            orderGroup: {
              select: {
                id: true,
              },
            },
          },
        },
      };
    }

    const group = (await this.prismaService.group.findFirst({
      where: {
        id: id,
        ...where,
      },
      select,
    })) as any;

    if (group && group.supportOrderGroup) {
      group.supportOrderGroup = group.supportOrderGroup?.map(
        (sog: any) => sog.orderGroup,
      );
    }

    return group;
  }

  async update(
    id: string,
    {
      managerIds,
      leaderIds,
      staff,
      groupIdsSupport,
      ...updateGroupDto
    }: UpdateGroupDto,
  ) {
    const user = ContextProvider.getAuthUser<AuthUser>();
    const group = await this.findOne(id);

    if (!group) {
      throw new ApiException(
        'Group not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.NOT_FOUND,
      );
    }

    if (group.status === StatusGroup.INACTIVE) {
      throw new ApiException(
        'Group is inactive',
        HttpStatus.BAD_GATEWAY,
        ErrorCode.INVALID_INPUT,
      );
    }

    const { managerIdsActiveCurrent } = group.users?.reduce(
      (acc: any, cur: UserGroup) => {
        const isActive = cur.status === StatusUserGroup.ACTIVE;
        if (cur.role === GroupRole.MANAGER && isActive) {
          acc.managerIdsActiveCurrent.push(cur.userId);
        }

        return acc;
      },
      {
        managerIdsActiveCurrent: [] as bigint[],
      },
    );

    let managerIdsUpdate: number[] | undefined = undefined;
    let groupIdsSupportUpdate: string[] | undefined = undefined;
    let leaderIdsGroup = leaderIds || [];
    const isPermissionUpdate =
      user.role === Role.ADMIN ||
      user.permissions?.includes(PERMISSION_KEYS.GROUP_UPDATE);

    if (managerIds && !isPermissionUpdate) {
      if (!managerIdsActiveCurrent.includes(user.id)) {
        throw new ApiException(
          'You do not have permission to update this group',
          HttpStatus.FORBIDDEN,
          ErrorCode.FORBIDDEN,
        );
      }
    } else {
      if (!managerIds?.length) {
        throw new ApiException(
          'ManagerIds is required',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }
      managerIdsUpdate = managerIds;
      if (group.type === GroupType.SUPPORT) {
        groupIdsSupportUpdate = groupIdsSupport;
      }
    }
    if (group.type === GroupType.SUPPORT) {
      groupIdsSupportUpdate =
        groupIdsSupportUpdate ||
        group.supportOrderGroup?.map((sog: any) => sog.id);
      leaderIdsGroup = [];
    }

    const { newStaffIds, leaderStaff, groupIdsSupportStaff } = (
      staff || []
    )?.reduce(
      (acc: any, cur) => {
        acc.newStaffIds.push(cur.userId);

        if (group.type === GroupType.SUPPORT) {
          acc.groupIdsSupportStaff.push(...(cur.groupIdsSupport || []));
        }

        if (group.type === GroupType.ORDER) {
          cur.leaderId && acc.leaderStaff.push(cur.leaderId);
        }

        return acc;
      },
      {
        newStaffIds: [] as number[],
        leaderStaff: [] as number[],
        groupIdsSupportStaff: [] as string[],
      },
    );
    console.log({ leaderStaff });
    if (groupIdsSupportUpdate?.length) {
      const countGroups = await this.prismaService.group.count({
        where: {
          id: {
            in: groupIdsSupportUpdate,
          },
          type: GroupType.ORDER,
        },
      });

      if (countGroups !== groupIdsSupportUpdate.length) {
        throw new ApiException(
          'Group order support not found in database',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }
    }
    if (groupIdsSupportStaff.length) {
      const setGroup = Array.from(
        new Set([...groupIdsSupportStaff, ...(groupIdsSupportUpdate || [])]),
      );

      if (setGroup.length !== groupIdsSupportUpdate?.length) {
        throw new ApiException(
          'Group order support is not group order support',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    if (leaderStaff.length) {
      const setLeaderIds = Array.from(
        new Set([...leaderIdsGroup, ...leaderStaff]),
      );
      console.log({ leaderIdsGroup, setLeaderIds, leaderIds: leaderIdsGroup });
      if (leaderIdsGroup.length !== setLeaderIds.length) {
        throw new ApiException(
          'Leader staff is not leader group',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    if (managerIds?.length || leaderIdsGroup?.length || newStaffIds?.length) {
      const userIdsMerge = [
        ...(managerIds || []),
        ...(leaderIdsGroup || []),
        ...(newStaffIds || []),
      ];

      if (Array.from(new Set(userIdsMerge)).length !== userIdsMerge.length) {
        throw new ApiException(
          'Duplicate user id in managerIds and leaderIds and staff',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }

      const countUsers = await this.checkUserInDatabase(userIdsMerge);

      if (countUsers !== userIdsMerge.length) {
        throw new ApiException(
          'User not found in database',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }

      await this.checkUserJoinOtherGroup(userIdsMerge, { excludeGroupId: id });
    }

    return await this.prismaService.$transaction(async (prisma) => {
      const users = {} as any;

      if (
        (managerIdsUpdate && managerIdsUpdate.length) ||
        leaderIdsGroup.length
      ) {
        const datAdd = [];

        if (managerIdsUpdate && managerIdsUpdate.length) {
          datAdd.push(
            ...managerIdsUpdate.map((userId) => ({
              userId,
              role: GroupRole.MANAGER,
              createBy: user.id,
              status: StatusUserGroup.ACTIVE,
            })),
          );
        }

        if (leaderIdsGroup.length) {
          datAdd.push(
            ...leaderIdsGroup.map((userId) => ({
              userId,
              role: GroupRole.LEADER,
              createBy: user.id,
              status: StatusUserGroup.ACTIVE,
            })),
          );
        }

        users.createMany = {
          data: datAdd,
        };
      }

      const whereDeleteUserGroup = {
        groupId: id,
      } as Prisma.UserGroupWhereInput;

      if (!managerIdsUpdate) {
        whereDeleteUserGroup.role = {
          not: GroupRole.MANAGER,
        };
      }
      await prisma.userGroup.deleteMany({
        where: whereDeleteUserGroup,
      });
      await prisma.supportOrderGroup.deleteMany({
        where: {
          supportGroupId: id,
        },
      });
      const updateGroup = await prisma.group.update({
        where: {
          id: id,
        },
        data: { ...updateGroupDto, users },
      });

      if (groupIdsSupportUpdate?.length) {
        await prisma.supportOrderGroup.createMany({
          data: groupIdsSupportUpdate.map((groupId) => ({
            supportGroupId: id,
            orderGroupId: groupId,
          })),
        });
      }

      if (staff?.length) {
        const staffToAdd = staff.map((s) => ({
          userId: s.userId,
          role: GroupRole.STAFF,
          leaderId: group.type === GroupType.ORDER ? s.leaderId : undefined,
          createBy: user.id,
          status: StatusUserGroup.ACTIVE,
          groupId: id,
        }));

        const createdUserGroups = await prisma.userGroup.createManyAndReturn({
          data: staffToAdd,
        });
        const createdUserGroupsByUserId = createdUserGroups.reduce(
          (acc, cur) => {
            acc[Number(cur.userId)] = cur;
            return acc;
          },
          {} as Record<number, UserGroup>,
        );

        if (group.type === GroupType.SUPPORT) {
          const userGroupSupportsToAdd = staff.flatMap(
            (s) =>
              s.groupIdsSupport?.map((groupSupportId) => ({
                userGroupId: createdUserGroupsByUserId[s.userId].id,
                groupSupportId,
              })) || [],
          );

          if (userGroupSupportsToAdd.length) {
            await prisma.userGroupSupport.createMany({
              data: userGroupSupportsToAdd,
            });
          }
        }
      }

      return updateGroup;
    });
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
