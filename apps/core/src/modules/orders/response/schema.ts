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
