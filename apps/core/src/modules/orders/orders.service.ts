import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role, StatusOrder, User } from '@prisma/client';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import { ErrorCode } from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { schemaPaging } from 'libs/utils/util';
import { map } from 'lodash';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkProductExist(productIds: bigint[]) {
    const products = await this.prismaService.product.findMany({
      where: {
        id: {
          in: productIds,
        },
        status: StatusOrder.ACTIVE,
      },
    });

    if (products.length !== productIds.length) {
      throw new ApiException(
        'Product not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }
  }

  checkPermissionInGroup(groupId: string, user: AuthUser) {
    if (!user?.dataGroups?.[groupId]) {
      throw new ApiException(
        'User not not in group',
        HttpStatus.FORBIDDEN,
        ErrorCode.FORBIDDEN,
      );
    }
  }

  async create(body: CreateOrderDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const { orderItems, ...order } = body;

    await this.checkProductExist(orderItems.map((item) => item.productId));

    if (order.groupId) {
      this.checkPermissionInGroup(order.groupId, user);
    }

    if (!order.groupId) {
      order.groupId = user?.dataGroupIdsOrder?.[0] || undefined;
    }

    // if (!order.groupId) {
    //   throw new ApiException(
    //     'User not in group order',
    //     HttpStatus.FORBIDDEN,
    //     ErrorCode.FORBIDDEN,
    //   );
    // }

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

    const where = {} as Prisma.OrderWhereInput;

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

    if (query.status) {
      where.status = query.status;
    }

    if (query.groupId) {
      where.groupId = query.groupId;
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

  async findOne(id: number) {
    return this.prismaService.order.findFirst({
      where: { id },
    });
  }

  async update(id: number, body: UpdateOrderDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();
    const orderCurrent = await this.findOne(id);

    if (!orderCurrent) {
      throw new ApiException(
        'Order not found',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (
      orderCurrent.userId !== user.id ||
      !user?.permissions?.includes(PERMISSION_KEYS.ORDER_UPDATE)
    ) {
      throw new ApiException(
        'User not permission ORDER_UPDATE or not owner order',
        HttpStatus.FORBIDDEN,
        ErrorCode.FORBIDDEN,
      );
    }

    // if (body.groupId) {
    //   this.checkPermissionInGroup(body.groupId, user);
    // }

    const { orderItems, ...order } = body;

    await this.prismaService.order.update({
      where: { id },
      data: order,
    });

    if (orderItems?.length) {
      const { productIds, newOrderItems } = orderItems.reduce(
        (acc, item) => {
          acc.productIds.push(item.productId);
          acc.newOrderItems.push({
            ...item,
            orderId: id,
          });
          return acc;
        },
        {
          productIds: [] as bigint[],
          newOrderItems: [] as Prisma.OrderItemCreateManyInput[],
        },
      );
      await this.checkProductExist(productIds);
      await this.prismaService.orderItem.deleteMany({ where: { orderId: id } });
      await this.prismaService.orderItem.createMany({
        data: newOrderItems,
      });
    }

    return body;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
