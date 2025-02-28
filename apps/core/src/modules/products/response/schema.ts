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

export const responseUpdateProductCategorySuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        name: 'FACEBOOK',
      },
      timestamp: '25/02/2025 17:23:15',
      path: '/api/core/v1/products/categories/1',
      traceId: '93b88772-19ac-47e3-99e3-5cd4d0e9ad63',
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
            id: 25,
            name: 'facebook fake 2',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T07:23:49.286Z',
            updatedAt: '2025-02-26T17:11:07.702Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 23,
            name: 'Facebook Acc',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:31.123Z',
            updatedAt: '2025-02-27T15:45:18.131Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 22,
            name: 'Facebook fanpage',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:29.421Z',
            updatedAt: '2025-02-27T15:45:35.599Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 21,
            name: 'fb 9',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:28.100Z',
            updatedAt: '2025-02-26T05:42:28.100Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 20,
            name: 'fb 8',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:26.679Z',
            updatedAt: '2025-02-26T05:42:26.679Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 19,
            name: 'fb 7',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:25.297Z',
            updatedAt: '2025-02-26T05:42:25.297Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 18,
            name: 'fb 6',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:23.878Z',
            updatedAt: '2025-02-26T05:42:23.878Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 17,
            name: 'fb 5',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:22.327Z',
            updatedAt: '2025-02-26T16:16:31.677Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
          {
            id: 16,
            name: 'fb 4',
            price: 0,
            status: 'ACTIVE',
            createdAt: '2025-02-26T05:42:20.638Z',
            updatedAt: '2025-02-26T16:16:36.091Z',
            category: {
              id: 1,
              name: 'FACEBOOK',
            },
          },
        ],
        totalPage: 1,
        totalItems: 9,
      },
      timestamp: '28/02/2025 08:20:03',
      path: '/api/core/v1/products?categoryId=1',
      traceId: 'd84f1f48-699a-41a3-8a3d-fd396e9faadf',
    },
  },
};

export const responseDetailProductSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 25,
        name: 'facebook fake 2',
        price: 0,
        status: 'ACTIVE',
        createdAt: '2025-02-26T07:23:49.286Z',
        updatedAt: '2025-02-26T17:11:07.702Z',
        category: {
          id: 1,
          name: 'FACEBOOK',
        },
      },
      timestamp: '28/02/2025 08:21:02',
      path: '/api/core/v1/products/25',
      traceId: '1b4f7e2f-19c1-49d5-84e6-15cfc5e361b0',
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
