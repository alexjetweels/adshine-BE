import { HttpStatus, Injectable } from '@nestjs/common';
import { Role, StatusOrder, User } from '@prisma/client';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ErrorCode } from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import { ContextProvider } from 'libs/utils/providers/context.provider';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { schemaPaging } from 'libs/utils/util';
import { map } from 'lodash';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreateOrderDto) {
    const user = ContextProvider.getAuthUser<User>();

    const { orderItems, ...order } = body;

    // Check order items with product
    const productIds = orderItems.map((item) => item.productId);
    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // if not exist throw error
    if (productIds.length !== products.length) {
      throw new ApiException(
        'Product not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    const newOrder = await this.prismaService.order.create({
      data: {
        ...order,
        userId: user.id,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    });

    return newOrder;
  }

  async findAll(query: ListOrderDto) {
    const user = ContextProvider.getAuthUser<User>();

    const where = {} as {
      OR?: object[];
      status?: StatusOrder;
      userId?: bigint;
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    };

    if (user.role !== Role.ADMIN) {
      where.userId = user.id;
    }

    if (query.startTime || query.endTime) {
      where.createdAt = {};
      if (query.startTime) {
        where.createdAt['gte'] = query.startTime;
      }
      if (query.endTime) {
        where.createdAt['lte'] = query.endTime;
      }
    }

    const records = await this.prismaService.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                category: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
      take: query.limit,
      skip: (query.page - 1) * query.limit,
    });

    const total = await this.prismaService.order.count({ where });

    const orders = map(records, (record) => {
      return {
        ...record,
      };
    });

    return schemaPaging({
      data: orders,
      page: query.page,
      limit: query.limit,
      totalPage: Math.ceil(total / query.limit),
      totalItems: total,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
