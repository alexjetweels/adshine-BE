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
            id: 'ff35426b-4972-49b0-8e6a-5c8e17400b19',
            name: 'order1',
            description: 'description',
            status: 'ACTIVE',
            createBy: 23,
            createdAt: '2025-02-25T04:50:51.719Z',
            updatedAt: '2025-02-25T04:50:51.719Z',
          },
        ],
        totalPage: 1,
        totalItems: 1,
      },
      timestamp: '25/02/2025 14:16:04',
      path: '/api/core/v1/groups',
      traceId: 'e0057aa6-3976-4803-97be-6c049bdc9384',
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
