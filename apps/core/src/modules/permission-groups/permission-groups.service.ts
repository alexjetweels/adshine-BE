import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ContextProvider } from 'libs/utils/providers/context.provider';
import { StatusPermissionGroup, User } from '@prisma/client';
import { ApiException } from 'libs/utils/exception';
import { ErrorCode } from 'libs/utils/enum';
import { ListPermissionGroupDto } from './dto/list-notifation.dto';
import { schemaPaging } from 'libs/utils/util';

@Injectable()
export class PermissionGroupsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByName(
    name: string,
    optional?: { excludeId?: string; status?: StatusPermissionGroup },
  ) {
    const status = optional?.status || StatusPermissionGroup.ACTIVE;
    if (optional?.excludeId) {
      return this.prismaService.permissionGroup.findFirst({
        where: {
          name,
          id: {
            not: optional.excludeId,
          },
          status,
        },
      });
    }

    return this.prismaService.permissionGroup.findFirst({
      where: {
        name,
        status,
      },
    });
  }
  async create(createPermissionGroupDto: CreatePermissionGroupDto) {
    const user = ContextProvider.getAuthUser<User>();
    const { permissionIds, ...permissionGroup } = createPermissionGroupDto;

    const existingPermissionGroup = await this.findByName(permissionGroup.name);
    if (existingPermissionGroup) {
      throw new ApiException(
        'Tên nhóm quyền đã tồn tại',
        HttpStatus.BAD_GATEWAY,
        ErrorCode.INVALID_INPUT,
      );
    }

    return this.prismaService.$transaction(async (prisma) => {
      const newPermissionGroup = await prisma.permissionGroup.create({
        data: {
          ...permissionGroup,
          createBy: user.id,
        },
      });

      await prisma.permissionGroupDetail.createMany({
        data: permissionIds.map((id) => ({
          permissionId: id,
          permissionGroupId: newPermissionGroup.id,
        })),
      });

      return { ...newPermissionGroup, permissions: permissionIds };
    });
  }

  async findAll(listPermissionGroupDto: ListPermissionGroupDto) {
    const where = {} as { OR?: object[]; status?: StatusPermissionGroup };

    if (listPermissionGroupDto.search) {
      where.OR = [
        {
          name: {
            contains: listPermissionGroupDto.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: listPermissionGroupDto.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    if (listPermissionGroupDto.status) {
      where.status = listPermissionGroupDto.status;
    }

    const records = await this.prismaService.permissionGroup.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
      take: listPermissionGroupDto.limit,
      skip: (listPermissionGroupDto.page - 1) * listPermissionGroupDto.limit,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        description: true,
      },
    });

    const total = await this.prismaService.permissionGroup.count({ where });

    return schemaPaging({
      data: records,
      page: listPermissionGroupDto.page,
      limit: listPermissionGroupDto.limit,
      totalPage: Math.ceil(total / listPermissionGroupDto.limit),
      totalItems: total,
    });
  }

  async findOne(id: string) {
    const result: any[] = await this.prismaService.$queryRaw`
      SELECT 
        pg.id, 
        pg.name, 
        pg."createdAt",
        pg."updatedAt",
        pg.status,
        pg.description,
        u.id AS "creatorId",
        u.name AS "creatorName",
        u.email AS "creatorEmail",
        COALESCE(
          json_agg(pgd."permissionId") FILTER (WHERE pgd."permissionId" IS NOT NULL), 
          '[]'
        ) AS "permissions"
      FROM permission_groups pg
      LEFT JOIN permission_group_details pgd ON pg.id = pgd."permissionGroupId"
      LEFT JOIN users u ON pg."createBy" = u.id
      WHERE pg.id = ${id}
      GROUP BY pg.id, u.id
    `;

    return result?.length ? result[0] : null;
  }

  async update(id: string, updatePermissionGroupDto: UpdatePermissionGroupDto) {
    const permissionGroup = await this.prismaService.permissionGroup.findUnique(
      {
        where: {
          id,
        },
      },
    );

    if (!permissionGroup) {
      throw new ApiException(
        'Quyền không tồn tại',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    const { permissionIds, ...data } = updatePermissionGroupDto;

    if (data.name) {
      const existingPermissionGroup = await this.findByName(data.name, {
        excludeId: id,
      });
      if (existingPermissionGroup && existingPermissionGroup.id !== id) {
        throw new ApiException(
          'Tên nhóm quyền đã tồn tại',
          HttpStatus.BAD_GATEWAY,
          ErrorCode.INVALID_INPUT,
        );
      }
    }

    return this.prismaService.$transaction(async (prisma) => {
      if (Object.keys(data).length) {
        await prisma.permissionGroup.update({
          where: { id },
          data: data,
        });
      }

      if (permissionIds) {
        await prisma.permissionGroupDetail.deleteMany({
          where: {
            permissionGroupId: id,
          },
        });

        await prisma.permissionGroupDetail.createMany({
          data: permissionIds.map((permissionId) => ({
            permissionId,
            permissionGroupId: id,
          })),
        });
      }

      return { ...permissionGroup, ...data, permissions: permissionIds };
    });
  }

  async remove(id: string) {
    await this.prismaService.permissionGroup.update({
      where: { id },
      data: {
        status: StatusPermissionGroup.INACTIVE,
      },
    });

    return true;
  }
}
