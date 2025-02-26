import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseCreateGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: 'ff35426b-4972-49b0-8e6a-5c8e17400b19',
        name: 'order1',
        description: 'description',
        status: 'ACTIVE',
        createBy: 23,
        createdAt: '2025-02-25T04:50:51.719Z',
        updatedAt: '2025-02-25T04:50:51.719Z',
        users: [
          {
            userId: 2,
            groupId: 'ff35426b-4972-49b0-8e6a-5c8e17400b19',
            status: 'ACTIVE',
            role: 'MANAGER',
            createBy: 23,
          },
        ],
      },
      timestamp: '25/02/2025 11:50:52',
      path: '/api/core/v1/groups',
      traceId: '0d7a9a6c-4088-4895-b687-c7ea5abecfe8',
    },
  },
};

export const responseListGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: 'a4cfa44b-ecf7-446a-8745-2e3cb274f1ad',
            name: 'GR O 1',
            description: null,
            status: 'ACTIVE',
            type: 'ORDER',
            createBy: 1,
            createdAt: '2025-02-26T15:36:25.426Z',
            updatedAt: '2025-02-26T15:36:25.426Z',
          },
          {
            id: '84f5f640-ad30-48da-9f57-ca0712e65b13',
            name: 'GR SP 1',
            description: null,
            status: 'ACTIVE',
            type: 'SUPPORT',
            createBy: 1,
            createdAt: '2025-02-26T15:24:25.567Z',
            updatedAt: '2025-02-26T15:24:25.567Z',
          },
          {
            id: '46097793-3017-4a8f-bfa1-069e29dbd870',
            name: 'order2',
            description: 'description',
            status: 'ACTIVE',
            type: 'ORDER',
            createBy: 1,
            createdAt: '2025-02-26T10:30:53.830Z',
            updatedAt: '2025-02-26T10:30:53.830Z',
          },
          {
            id: '2d3b8212-4981-4ba8-b667-a07b98e565a0',
            name: 'GR SP 2',
            description: null,
            status: 'ACTIVE',
            type: 'SUPPORT',
            createBy: 1,
            createdAt: '2025-02-26T15:36:40.566Z',
            updatedAt: '2025-02-26T15:36:40.566Z',
          },
        ],
        totalPage: 1,
        totalItems: 4,
      },
      timestamp: '27/02/2025 00:05:03',
      path: '/api/core/v1/groups',
      traceId: '198ef643-3677-4291-8548-12027d7b9e9c',
    },
  },
};

export const responseDetailGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: 'e730449a-0291-4144-9057-ab2eb2721c39',
        name: 'order2',
        description: 'description',
        status: 'ACTIVE',
        createdAt: '2025-02-25T07:26:36.041Z',
        updatedAt: '2025-02-25T07:26:36.041Z',
        users: [
          {
            userId: 2,
            status: 'ACTIVE',
            role: 'MANAGER',
            user: {
              id: 2,
              name: 'update1',
              email: 'user01@gmail.com',
            },
          },
          {
            userId: 3,
            status: 'ACTIVE',
            role: 'MANAGER',
            user: {
              id: 3,
              name: 'Default Name',
              email: 'user2@gmail.com',
            },
          },
        ],
      },
      timestamp: '25/02/2025 14:27:11',
      path: '/api/core/v1/groups/e730449a-0291-4144-9057-ab2eb2721c39',
      traceId: '79f42cde-e1e6-493f-8c47-7b4335f0ecf5',
    },
  },
};
