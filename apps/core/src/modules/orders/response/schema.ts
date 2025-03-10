import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseCreateOrderSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 6,
        userId: 13,
        totalPrice: 22222,
        createdAt: '2025-02-03T08:45:12.590Z',
        updatedAt: '2025-02-03T08:45:12.590Z',
        status: 'ACTIVE',
        description: 'dsfkjhkasdfjhaslhfj',
      },
      timestamp: '03/02/2025 15:45:12',
      path: '/api/core/v1/orders',
      traceId: '6aa614f8-77ab-492d-bbc0-96c4aeedf0a6',
    },
  },
};

export const responseListOrderSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: 6,
            userId: 13,
            totalPrice: 22222,
            createdAt: '2025-02-03T08:45:12.590Z',
            updatedAt: '2025-02-03T08:45:12.590Z',
            status: 'ACTIVE',
            description: 'dsfkjhkasdfjhaslhfj',
            orderItems: [
              {
                orderId: 6,
                productId: 1,
                quantity: 10,
                price: 1111,
                product: {
                  category: 'category',
                  name: 'hihi',
                },
              },
            ],
            user: {
              id: 13,
              email: 'user12@gmail.com',
              name: 'Default Name',
            },
          },
          {
            id: 5,
            userId: 13,
            totalPrice: 1111,
            createdAt: '2025-02-03T08:45:09.780Z',
            updatedAt: '2025-02-03T08:45:09.780Z',
            status: 'ACTIVE',
            description: 'dsfkjhkasdfjhaslhfj',
            orderItems: [
              {
                orderId: 5,
                productId: 1,
                quantity: 10,
                price: 1111,
                product: {
                  category: 'category',
                  name: 'hihi',
                },
              },
            ],
            user: {
              id: 13,
              email: 'user12@gmail.com',
              name: 'Default Name',
            },
          },
          {
            id: 4,
            userId: 13,
            totalPrice: 1111,
            createdAt: '2025-02-03T08:43:04.950Z',
            updatedAt: '2025-02-03T08:43:04.950Z',
            status: 'ACTIVE',
            description: 'dsfkjhkasdfjhaslhfj',
            orderItems: [
              {
                orderId: 4,
                productId: 1,
                quantity: 10,
                price: 1111,
                product: {
                  category: 'category',
                  name: 'hihi',
                },
              },
            ],
            user: {
              id: 13,
              email: 'user12@gmail.com',
              name: 'Default Name',
            },
          },
          {
            id: 1,
            userId: 13,
            totalPrice: 1111,
            createdAt: '2025-02-03T08:37:27.773Z',
            updatedAt: '2025-02-03T08:37:27.773Z',
            status: 'ACTIVE',
            description: 'dsfkjhkasdfjhaslhfj',
            orderItems: [
              {
                orderId: 1,
                productId: 1,
                quantity: 10,
                price: 1111,
                product: {
                  category: 'category',
                  name: 'hihi',
                },
              },
            ],
            user: {
              id: 13,
              email: 'user12@gmail.com',
              name: 'Default Name',
            },
          },
        ],
        totalPage: 1,
        totalItems: 4,
      },
      timestamp: '03/02/2025 16:16:54',
      path: '/api/core/v1/orders',
      traceId: '8db5dc14-72d1-483d-9124-5c29072ef683',
    },
  },
};

export const responseHistoryOrderSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: 7,
            orderId: 23,
            userId: 21,
            action: 'COMPLETED',
            createdAt: '2025-03-06T15:34:26.336Z',
            note: null,
            order: {
              id: 23,
              userId: 21,
              totalPrice: 60000000,
              createdAt: '2025-03-06T15:06:50.737Z',
              updatedAt: '2025-03-06T15:34:26.336Z',
              status: 'ACTIVE',
              state: 'COMPLETED',
              description: null,
              groupId: 'e44b1a2a-7671-4d6a-80a6-4c5a976f7765',
              user: {
                id: 21,
                email: 'user15@gmail.com',
                name: 'user15',
              },
            },
            user: {
              id: 21,
              email: 'user15@gmail.com',
              name: 'user15',
            },
          },
          {
            id: 6,
            orderId: 23,
            userId: 14,
            action: 'PRODUCT_DELIVERED',
            createdAt: '2025-03-06T15:33:49.560Z',
            note: null,
            order: {
              id: 23,
              userId: 21,
              totalPrice: 60000000,
              createdAt: '2025-03-06T15:06:50.737Z',
              updatedAt: '2025-03-06T15:34:26.336Z',
              status: 'ACTIVE',
              state: 'COMPLETED',
              description: null,
              groupId: 'e44b1a2a-7671-4d6a-80a6-4c5a976f7765',
              user: {
                id: 21,
                email: 'user15@gmail.com',
                name: 'user15',
              },
            },
            user: {
              id: 14,
              email: 'aaa@gmail.com',
              name: 'Alex',
            },
          },
          {
            id: 5,
            orderId: 22,
            userId: 21,
            action: 'CANCELED',
            createdAt: '2025-03-06T15:03:47.789Z',
            note: null,
            order: {
              id: 22,
              userId: 21,
              totalPrice: 2000000,
              createdAt: '2025-03-06T14:30:44.767Z',
              updatedAt: '2025-03-06T15:03:47.789Z',
              status: 'ACTIVE',
              state: 'CANCELED',
              description: 'Mua bán account facebook',
              groupId: 'e44b1a2a-7671-4d6a-80a6-4c5a976f7765',
              user: {
                id: 21,
                email: 'user15@gmail.com',
                name: 'user15',
              },
            },
            user: {
              id: 21,
              email: 'user15@gmail.com',
              name: 'user15',
            },
          },
          {
            id: 4,
            orderId: 21,
            userId: 17,
            action: 'COMPLETED',
            createdAt: '2025-03-05T17:04:17.253Z',
            note: null,
            order: {
              id: 21,
              userId: 17,
              totalPrice: 41000,
              createdAt: '2025-03-05T16:16:31.401Z',
              updatedAt: '2025-03-05T17:04:17.253Z',
              status: 'ACTIVE',
              state: 'COMPLETED',
              description: null,
              groupId: 'e44b1a2a-7671-4d6a-80a6-4c5a976f7765',
              user: {
                id: 17,
                email: 'user14@gmail.com',
                name: 'user14',
              },
            },
            user: {
              id: 17,
              email: 'user14@gmail.com',
              name: 'user14',
            },
          },
          {
            id: 3,
            orderId: 21,
            userId: 23,
            action: 'PRODUCT_DELIVERED',
            createdAt: '2025-03-05T17:01:34.957Z',
            note: null,
            order: {
              id: 21,
              userId: 17,
              totalPrice: 41000,
              createdAt: '2025-03-05T16:16:31.401Z',
              updatedAt: '2025-03-05T17:04:17.253Z',
              status: 'ACTIVE',
              state: 'COMPLETED',
              description: null,
              groupId: 'e44b1a2a-7671-4d6a-80a6-4c5a976f7765',
              user: {
                id: 17,
                email: 'user14@gmail.com',
                name: 'user14',
              },
            },
            user: {
              id: 23,
              email: 'user17@gmail.com',
              name: 'user17',
            },
          },
          {
            id: 2,
            orderId: 21,
            userId: 1,
            action: 'UN_REMOVE',
            createdAt: '2025-03-05T16:19:06.318Z',
            note: null,
            order: {
              id: 21,
              userId: 17,
              totalPrice: 41000,
              createdAt: '2025-03-05T16:16:31.401Z',
              updatedAt: '2025-03-05T17:04:17.253Z',
              status: 'ACTIVE',
              state: 'COMPLETED',
              description: null,
              groupId: 'e44b1a2a-7671-4d6a-80a6-4c5a976f7765',
              user: {
                id: 17,
                email: 'user14@gmail.com',
                name: 'user14',
              },
            },
            user: {
              id: 1,
              email: 'admin@gmail.com',
              name: 'Admin',
            },
          },
          {
            id: 1,
            orderId: 21,
            userId: 1,
            action: 'REMOVE',
            createdAt: '2025-03-05T16:18:47.015Z',
            note: null,
            order: {
              id: 21,
              userId: 17,
              totalPrice: 41000,
              createdAt: '2025-03-05T16:16:31.401Z',
              updatedAt: '2025-03-05T17:04:17.253Z',
              status: 'ACTIVE',
              state: 'COMPLETED',
              description: null,
              groupId: 'e44b1a2a-7671-4d6a-80a6-4c5a976f7765',
              user: {
                id: 17,
                email: 'user14@gmail.com',
                name: 'user14',
              },
            },
            user: {
              id: 1,
              email: 'admin@gmail.com',
              name: 'Admin',
            },
          },
        ],
        totalPage: 1,
        totalItems: 7,
      },
      timestamp: '07/03/2025 23:45:57',
      path: '/api/core/v1/orders/history',
      traceId: 'f975bdf2-d522-41d5-87ab-91d99ef9c989',
    },
  },
};

export const responseStatsOrderSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        '2950b4bc-4b68-4cde-82a4-950a941bf885': {
          '09/03/2025': {
            total: 2000000,
            count: 1,
          },
          name: 'Nhóm sản phẩm 002xx',
        },
        'e44b1a2a-7671-4d6a-80a6-4c5a976f7765': {
          '06/02/2025': {
            total: 60000000,
            count: 1,
          },
          '05/03/2025': {
            total: 41000,
            count: 1,
          },
          name: 'Nhóm sản phẩm 001',
        },
      },
      timestamp: '10/03/2025 20:27:35',
      path: '/api/core/v1/orders/stats?startTime=2025-02-04T08:43:04.950Z&endTime=2025-04-04T08:43:04.950Z',
      traceId: 'a6cf929f-6c2e-42af-83af-9bee219f5f4c',
    },
  },
};
