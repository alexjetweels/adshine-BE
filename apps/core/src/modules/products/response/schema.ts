import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseCreateProductSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 4,
        category: 'YOUTOBE_1',
        name: 'youtobe hehe',
        description: null,
        price: 0,
        stock: 0,
        status: 'ACTIVE',
        createdAt: '2025-02-03T03:18:41.571Z',
        updatedAt: '2025-02-03T03:18:41.571Z',
      },
      timestamp: '03/02/2025 10:18:41',
      path: '/api/core/v1/products',
      traceId: '4319bb10-b128-4889-b059-be46859083bc',
    },
  },
};

export const responseCreateProductCategorySuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 1,
        name: 'FACEBOOK',
        description: null,
        status: 'ACTIVE',
        createBy: 23,
        createdAt: '2025-02-25T09:24:30.772Z',
        updatedAt: '2025-02-25T09:24:30.772Z',
      },
      timestamp: '25/02/2025 16:24:30',
      path: '/api/core/v1/products/categories',
      traceId: 'db0e6e94-670c-488c-94c2-3d9f8818d8a2',
    },
  },
};

export const responseListProductCategorySuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: 1,
            name: 'FACEBOOK',
            description: null,
            status: 'ACTIVE',
            createBy: 23,
            createdAt: '2025-02-25T09:24:30.772Z',
            updatedAt: '2025-02-25T09:24:30.772Z',
          },
        ],
        totalPage: 1,
        totalItems: 1,
      },
      timestamp: '25/02/2025 16:31:38',
      path: '/api/core/v1/products/categories',
      traceId: '0b0d1d7b-e720-43e1-97e1-c70e53633f8d',
    },
  },
};

export const responseListProductSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: 5,
            category: 'FACEBOOK_0',
            name: 'fb 1',
            description: null,
            price: 0,
            stock: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-03T03:20:45.734Z',
            updatedAt: '2025-02-03T03:20:45.734Z',
          },
          {
            id: 4,
            category: 'YOUTOBE_1',
            name: 'youtobe hehe',
            description: null,
            price: 0,
            stock: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-03T03:18:41.571Z',
            updatedAt: '2025-02-03T03:18:41.571Z',
          },
          {
            id: 1,
            category: 'YOUTOBE',
            name: null,
            description: null,
            price: 0,
            stock: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-03T03:16:31.120Z',
            updatedAt: '2025-02-03T03:16:31.120Z',
          },
        ],
        totalPage: 1,
        totalItems: 3,
      },
      timestamp: '03/02/2025 10:28:57',
      path: '/api/core/v1/products',
      traceId: '7efa6871-8a66-41f5-89ae-df25d06fc9df',
    },
  },
};

export const responseDetailProductSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 1,
        category: 'YOUTOBE',
        name: null,
        description: null,
        price: 0,
        stock: 0,
        status: 'ACTIVE',
        createdAt: '2025-02-03T03:16:31.120Z',
        updatedAt: '2025-02-03T03:16:31.120Z',
      },
      timestamp: '03/02/2025 10:31:02',
      path: '/api/core/v1/products/1',
      traceId: 'd05a4f3f-918e-4713-bc75-0c86897a7d5d',
    },
  },
};

export const responseUpdateProductSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        category: 'category',
        name: 'hihi',
      },
      timestamp: '03/02/2025 10:48:55',
      path: '/api/core/v1/products/1',
      traceId: 'd762264c-802a-4e7f-89f3-25643c7b18c9',
    },
  },
};
