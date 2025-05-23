import { HttpStatus, Injectable } from '@nestjs/common';
import {
  GroupRole,
  Order,
  OrderState,
  OrderType,
  Prisma,
  Role,
  StatusOrder,
} from '@prisma/client';
import { PERMISSION_KEYS } from 'libs/modules/init-data/init';
import { PrismaService } from 'libs/modules/prisma/prisma.service';
import {
  ErrorCode,
  UserNotificationRedirectType,
  UserNotificationType,
} from 'libs/utils/enum';
import { ApiException } from 'libs/utils/exception';
import {
  AuthUser,
  ContextProvider,
} from 'libs/utils/providers/context.provider';
import { schemaPaging } from 'libs/utils/util';
import { map } from 'lodash';
import { CreateOrderDto } from './dto/create-order.dto';
import { HistoryOrderDto } from './dto/history-order.dto';
import { ListOrderDto } from './dto/list-order.dto';
import { StatsOrderDto } from './dto/stats-order.dto';
import { UpdateOrderStateDto } from './dto/update-order-state';
import { UpdateOrderDto } from './dto/update-order.dto';
import moment from 'moment';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { OneSignalService } from '../one-signal/one-signal.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly oneSignalService: OneSignalService,
  ) {}

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
        'Sản phẩm không tồn tại hoặc đã bị xóa',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }
  }

  checkPermissionInGroup(groupId: string, user: AuthUser) {
    if (user.role === Role.ADMIN) return;
    if (!user?.dataGroups?.[groupId]) {
      throw new ApiException(
        'Người dùng không thuộc group này',
        HttpStatus.FORBIDDEN,
        ErrorCode.FORBIDDEN,
      );
    }
  }

  async create(body: CreateOrderDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const { orderItems, staffSupportId, ...order } = body;

    await this.checkProductExist(orderItems.map((item) => item.productId));

    if (order.groupId) {
      this.checkPermissionInGroup(order.groupId, user);
    }

    if (!order.groupId) {
      order.groupId = user?.dataGroupIdsOrder?.[0] || undefined;
    }

    if (!order.groupId) {
      throw new ApiException(
        'Bạn đang k chọn group hoặc đang không thuộc group nào',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (staffSupportId) {
      const staffDataGroup =
        await this.jwtStrategy.getInfoGroupUser(staffSupportId);

      if (!staffDataGroup.dataGroupIdsOrderSupport?.includes(order.groupId)) {
        throw new ApiException(
          'Staff không thuộc nhóm hỗ trợ cho nhóm này',
          HttpStatus.FORBIDDEN,
          ErrorCode.FORBIDDEN,
        );
      }

      if (
        order.groupSupportId &&
        !staffDataGroup.dataGroupUser[order.groupSupportId]
      ) {
        throw new ApiException(
          'Staff không thuộc nhóm hỗ trợ cho nhóm này',
          HttpStatus.FORBIDDEN,
          ErrorCode.FORBIDDEN,
        );
      }

      if (order.groupSupportId) {
        order.groupSupportId = staffDataGroup.dataGroupIdsOrderSupport[0];
      }
    }

    const newOrder = await this.prismaService.order.create({
      data: {
        ...order,
        staffSupportId,
        userId: user.id,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    });

    if (staffSupportId) {
      this.oneSignalService.sendNotification(
        'Đơn hàng mới',
        `Có 1 đơn hàng mới được tạo bởi ${user.email}`,
        [staffSupportId],
        {
          type: UserNotificationType.NEW_ORDER,
          redirectType: UserNotificationRedirectType.ORDER,
          redirectId: newOrder.id,
        },
      );
    }

    return newOrder;
  }

  async findAll(query: ListOrderDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const where = {} as Prisma.OrderWhereInput;

    if (query.isMyOrder) {
      where.userId = user.id;
    }

    if (query.userId) {
      where.userId = query.userId;
    }

    if (query.groupId) {
      where.groupId = query.groupId;
    }

    if (user.role !== Role.ADMIN) {
      if (user.dataGroupIdsOrder?.length) {
        const managerGroupIds = [];
        let isStaff = false;

        for (const [groupId, groupData] of Object.entries(
          user.dataGroups || {},
        )) {
          if (groupData.role === GroupRole.MANAGER) {
            managerGroupIds.push(groupId);
          } else if (groupData.role === GroupRole.STAFF) {
            isStaff = true;
          }
        }

        if (managerGroupIds.length > 0) {
          where.groupId = { in: managerGroupIds };
        } else if (isStaff) {
          where.userId = user.id;
        }
      } else if (user.dataGroupIdsOrderSupport?.length) {
        const managerGroupIds = Object.keys(user.dataGroups || {}).filter(
          (id) => user?.dataGroups?.[id].role === GroupRole.MANAGER,
        );

        where.OR = [
          {
            groupId: {
              in: managerGroupIds,
            },
          },
          {
            staffSupportId: user.id,
          },
        ];
      } else {
        return schemaPaging({
          data: [],
          page: query.page,
          limit: query.limit,
          totalPage: Math.ceil(0 / query.limit),
          totalItems: 0,
        });
      }
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

    if (query.state) {
      where.state = query.state;
    }

    if (query.productId) {
      where.orderItems = {
        some: {
          productId: query.productId,
        },
      };
    }

    if (query.categoryId) {
      where.orderItems = {
        some: {
          product: {
            categoryId: query.categoryId,
          },
        },
      };
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
                description: true,
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
        staffSupport: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        groupSupport: {
          select: {
            id: true,
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
        'Không tìm thấy đơn hàng',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    const { orderItems, ...order } = body;

    if (order.staffSupportId) {
      const staffDataGroup = await this.jwtStrategy.getInfoGroupUser(
        order.staffSupportId,
      );

      body.groupSupportId =
        body.groupSupportId ||
        orderCurrent.groupSupportId ||
        staffDataGroup.dataGroupIdsOrderSupport[0];

      if (
        orderCurrent.groupId &&
        !staffDataGroup.dataGroupIdsOrderSupport?.includes(orderCurrent.groupId)
      ) {
        throw new ApiException(
          'Staff không thuộc nhóm hỗ trợ cho nhóm này',
          HttpStatus.FORBIDDEN,
          ErrorCode.FORBIDDEN,
        );
      }

      if (
        order.groupSupportId &&
        !staffDataGroup.dataGroupUser[body.groupSupportId]
      ) {
        throw new ApiException(
          'Staff không thuộc nhóm hỗ trợ cho nhóm này',
          HttpStatus.FORBIDDEN,
          ErrorCode.FORBIDDEN,
        );
      }
    }

    return await this.prismaService.$transaction(async (prisma) => {
      await prisma.order.update({
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
        await prisma.orderItem.deleteMany({
          where: { orderId: id },
        });
        await prisma.orderItem.createMany({
          data: newOrderItems,
        });
      }

      if (order.status && order.status !== orderCurrent.status) {
        const statusOrderHistory =
          order.status === StatusOrder.ACTIVE
            ? OrderState.UN_REMOVE
            : OrderState.REMOVE;
        await prisma.orderHistory.create({
          data: {
            orderId: id,
            action: statusOrderHistory,
            userId: user.id,
          },
        });
      }
      return body;
    });
  }

  validateUpdateStateOrder(order: Order, state: OrderState) {
    if (
      [OrderState.CANCELED, OrderState.COMPLETED].includes(
        order.state as 'CANCELED' | 'COMPLETED',
      )
    ) {
      const message = {
        [OrderState.CANCELED]: 'Đơn hàng đã bị hủy',
        [OrderState.COMPLETED]: 'Đơn hàng đã hoàn thành',
      } as {
        [x: string]: string;
      };
      throw new ApiException(
        message[order.state],
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (state === OrderState.CANCELED && order.state !== OrderState.CREATED) {
      throw new ApiException(
        'Bạn không thể hủy khi đơn hàng không còn ở trạng thái tạo',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (
      state === OrderState.PRODUCT_DELIVERED &&
      order.state !== OrderState.CREATED
    ) {
      throw new ApiException(
        'Bạn không thể chuyển trạng thái đơn hàng sang đã giao hàng khi đơn hàng không còn ở trạng thái tạo',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (
      state === OrderState.COMPLETED &&
      order.state !== OrderState.PRODUCT_DELIVERED
    ) {
      throw new ApiException(
        'Bạn không thể chuyển trạng thái đơn hàng sang đã hoàn thành khi đơn hàng không còn ở trạng thái đã giao hàng',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }
  }

  validatePermissionUpdateStateOrder(
    order: Order,
    user: AuthUser,
    state: OrderState,
  ) {
    if (
      user.role === Role.ADMIN ||
      user.permissions?.includes(PERMISSION_KEYS.ORDER_UPDATE_STATE)
    ) {
      return;
    }

    if (
      state !== OrderState.PRODUCT_DELIVERED &&
      order.groupId &&
      (!user.dataGroupIdsOrder?.includes(order.groupId) ||
        !user.permissions?.includes(PERMISSION_KEYS.ORDER_UPDATE_STATE))
    ) {
      throw new ApiException(
        'Bạn không có quyền xác nhận hoàn thành hay hủy đơn hàng này',
        HttpStatus.FORBIDDEN,
        ErrorCode.FORBIDDEN,
      );
    }

    if (
      state === OrderState.PRODUCT_DELIVERED &&
      order.groupId &&
      !user.dataGroupIdsOrderSupport?.includes(order.groupId)
    ) {
      throw new ApiException(
        'Bạn không có quyền xác nhận đã giao hàng cho đơn hàng này',
        HttpStatus.FORBIDDEN,
        ErrorCode.FORBIDDEN,
      );
    }
  }

  async updateState(id: number, body: UpdateOrderStateDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();
    const orderCurrent = await this.findOne(id);

    if (!orderCurrent) {
      throw new ApiException(
        'Không tìm thấy đơn hàng',
        HttpStatus.NOT_FOUND,
        ErrorCode.INVALID_INPUT,
      );
    }

    if (orderCurrent.status === StatusOrder.INACTIVE) {
      throw new ApiException(
        'Đơn hàng đã bị xóa',
        HttpStatus.BAD_REQUEST,
        ErrorCode.INVALID_INPUT,
      );
    }

    this.validatePermissionUpdateStateOrder(orderCurrent, user, body.state);
    this.validateUpdateStateOrder(orderCurrent, body.state);

    const data = await this.prismaService.$transaction(async (prisma) => {
      await prisma.order.update({
        where: { id },
        data: { state: body.state },
      });

      await prisma.orderHistory.create({
        data: {
          orderId: id,
          action: body.state,
          userId: user.id,
        },
      });

      return body;
    });

    if (body.state === OrderState.COMPLETED) {
      this.oneSignalService.sendNotification(
        'Đơn hàng đã hoàn thành',
        `Đơn hàng ${id} đã hoàn thành bởi ${user.email}`,
        [Number(orderCurrent.userId)],
        {
          type: UserNotificationType.ORDER_COMPLETED,
          redirectType: UserNotificationRedirectType.ORDER,
          redirectId: id,
        },
      );
    }

    return data;
  }

  async getHistoryOrder(query: HistoryOrderDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const where = {} as Prisma.OrderHistoryWhereInput;

    if (query.orderIds) {
      where.orderId = {
        in: query.orderIds,
      };
    }

    if (query.state) {
      where.action = query.state;
    }

    if (user.role !== Role.ADMIN) {
      // query in orders
      where.order = {
        groupId: {
          in: [
            ...(user.dataGroupIdsOrder || []),
            ...(user.dataGroupIdsOrderSupport || []),
          ],
        },
      };
    }

    const records = await this.prismaService.orderHistory.findMany({
      where,
      include: {
        order: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
            group: {
              select: {
                id: true,
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

    const total = await this.prismaService.orderHistory.count({ where });

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

  async getStatsOrders(query: StatsOrderDto) {
    const user = ContextProvider.getAuthUser<AuthUser>();

    const where = {} as Prisma.OrderWhereInput;

    if (query.orderIds) {
      where.id = {
        in: query.orderIds,
      };
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

    if (query.state) {
      where.state = query.state;
    }

    if (user.role !== Role.ADMIN) {
      const managerGroupIds = [];
      let isStaff = false;

      for (const [groupId, groupData] of Object.entries(
        user.dataGroups || {},
      )) {
        if (groupData.role === GroupRole.MANAGER) {
          managerGroupIds.push(groupId);
        } else if (groupData.role === GroupRole.STAFF) {
          isStaff = true;
        }
      }
      if (managerGroupIds.length > 0) {
        // Nếu có group role MANAGER, tìm theo groupId
        where.groupId = { in: managerGroupIds };
      } else if (isStaff) {
        // Nếu chỉ có role STAFF, tìm theo userId
        where.userId = user.id;
      }
    }

    const records = await this.prismaService.order.findMany({
      where,
      orderBy: {
        id: 'asc',
      },
    });

    const allGroupIds: string[] = [];
    const dataConvert = records.reduce(
      (acc, cur) => {
        if (!cur.groupId) return acc;
        const date = moment(cur.createdAt)
          .utcOffset(query.utcOffset)
          .format('DD/MM/YYYY');

        if (!acc[cur.groupId]) {
          acc[cur.groupId] = {};
          allGroupIds.push(cur.groupId);
        }

        if (!acc[cur.groupId][date]) {
          acc[cur.groupId][date] = { total: BigInt(0), count: 0 };
        }

        // Add the item to the respective groupId and date
        const priceHandle =
          cur.type === OrderType.BUY ? cur.totalPrice : -cur.totalPrice;

        acc[cur.groupId][date].total += priceHandle;
        acc[cur.groupId][date].count += 1;

        return acc;
      },
      {} as Record<string, Record<string, any>>,
    );

    const dataGroup = await this.prismaService.group.findMany({
      where: {
        id: {
          in: allGroupIds,
        },
      },
    });

    // map name group to dataConvert
    dataGroup.forEach((group) => {
      const groupData = dataConvert[group.id];
      if (groupData) {
        groupData.name = group.name;
      }
    });

    return dataConvert;
  }
}
