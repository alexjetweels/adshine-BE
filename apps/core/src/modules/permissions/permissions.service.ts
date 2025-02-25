import { Injectable } from '@nestjs/common';
import { ListPermissionDto } from './dto/list-permission.dto';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { schemaPaging } from 'libs/utils/util';

@Injectable()
export class PermissionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(listPermissionDto: ListPermissionDto) {
    const where = {} as { OR?: object[] };

    if (listPermissionDto.search) {
      where.OR = [
        {
          id: { contains: listPermissionDto.search, mode: 'insensitive' },
        },
        {
          description: {
            contains: listPermissionDto.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const records = await this.prismaService.permission.findMany({
      where,
      orderBy: {
        id: 'desc',
      },
    });

    const groupedPermissions = records.reduce(
      (acc, item) => {
        const [prefix] = item.id.split('_');
        if (!acc[prefix]) {
          acc[prefix] = [];
        }
        acc[prefix].push(item);
        return acc;
      },
      {} as Record<string, typeof records>,
    );

    return groupedPermissions;
  }
}
