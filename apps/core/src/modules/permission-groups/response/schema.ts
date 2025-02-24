import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseCreatePermissionGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: 'ac96ae9c-5ac3-4ef7-ad9d-4f86595a4102',
        name: 'order1',
        createBy: 1,
        createdAt: '2025-02-24T04:54:56.644Z',
        updatedAt: '2025-02-24T04:54:56.644Z',
        status: 'ACTIVE',
        description: 'description',
      },
      timestamp: '24/02/2025 11:54:57',
      path: '/api/core/v1/permission-groups',
      traceId: 'ab605c91-116e-4700-bedd-0150476e19fb',
    },
  },
};

export const responseListPermissionGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: 'e1f5356f-0c74-408f-9f68-9d58ab954a25',
            name: 'order',
            createBy: 1,
            createdAt: '2025-02-24T04:50:03.159Z',
            updatedAt: '2025-02-24T04:50:03.159Z',
            status: 'ACTIVE',
            description: 'description',
          },
          {
            id: 'ac96ae9c-5ac3-4ef7-ad9d-4f86595a4102',
            name: 'order1',
            createBy: 1,
            createdAt: '2025-02-24T04:54:56.644Z',
            updatedAt: '2025-02-24T04:54:56.644Z',
            status: 'ACTIVE',
            description: 'description',
          },
        ],
        totalPage: 1,
        totalItems: 2,
      },
      timestamp: '24/02/2025 15:09:24',
      path: '/api/core/v1/permission-groups',
      traceId: 'b450ec97-4d7a-46dc-aa9e-daba77f8f93f',
    },
  },
};

export const responseDetailPermissionGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: 'e1f5356f-0c74-408f-9f68-9d58ab954a25',
        name: 'order',
        createdAt: '2025-02-24T04:50:03.159Z',
        updatedAt: '2025-02-24T04:50:03.159Z',
        status: 'ACTIVE',
        description: 'description',
        creatorId: 1,
        creatorName: 'Admin',
        creatorEmail: 'admin@gmail.com',
        permissions: ['NOTIFICATION_CREATE', 'NOTIFICATION_UPDATE'],
      },
      timestamp: '24/02/2025 16:14:07',
      path: '/api/core/v1/permission-groups/e1f5356f-0c74-408f-9f68-9d58ab954a25',
      traceId: '6c6441e0-1e14-497d-9a21-829a18d17bfd',
    },
  },
};

export const responseUpdatePermissionGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: 'ac96ae9c-5ac3-4ef7-ad9d-4f86595a4102',
        name: 'orderhihihii',
        createdAt: '2025-02-24T04:54:56.644Z',
        updatedAt: '2025-02-24T09:40:10.660Z',
        status: 'ACTIVE',
        description: 'description',
        creatorId: 1,
        creatorName: 'Admin',
        creatorEmail: 'admin@gmail.com',
        permissions: ['NOTIFICATION_CREATE'],
      },
      timestamp: '24/02/2025 16:40:14',
      path: '/api/core/v1/permission-groups/ac96ae9c-5ac3-4ef7-ad9d-4f86595a4102',
      traceId: '68a5601c-1d7e-4d3c-8256-a3116084cfbb',
    },
  },
};
