import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseMeSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 22,
        email: 'user16@gmail.com',
        name: 'user16',
        isBan: false,
        createdAt: '2025-02-24T16:51:45.589Z',
        updatedAt: '2025-02-24T16:51:45.589Z',
        permissions: ['NOTIFICATION_CREATE', 'NOTIFICATION_UPDATE'],
      },
      timestamp: '25/02/2025 00:01:19',
      path: '/api/core/v1/users/me',
      traceId: '635343d5-515b-4f83-af51-91582cc73faa',
    },
  },
};

export const responseGetListUserSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: 12,
            email: 'user11@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:26.415Z',
          },
          {
            id: 11,
            email: 'user10@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:25.124Z',
          },
          {
            id: 10,
            email: 'user9@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:23.174Z',
          },
          {
            id: 9,
            email: 'user8@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:21.816Z',
          },
          {
            id: 8,
            email: 'user7@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:20.243Z',
          },
          {
            id: 7,
            email: 'user6@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:18.420Z',
          },
          {
            id: 6,
            email: 'user5@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:16.928Z',
          },
          {
            id: 5,
            email: 'user4@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:11.309Z',
          },
          {
            id: 4,
            email: 'user3@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:21:41.294Z',
          },
          {
            id: 3,
            email: 'user2@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T14:55:16.349Z',
          },
          {
            id: 2,
            email: 'user01@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T14:54:27.813Z',
          },
        ],
        totalPage: 1,
        totalItems: 11,
      },
      timestamp: '02/02/2025 22:51:44',
      path: '/api/core/v1/users?search=user',
      traceId: '95224e18-d8a0-49ec-a1cd-4d5121e95a28',
    },
  },
};

export const responseCreateUserSuccess: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Response example',
  schema: {
    example: {
      data: {
        email: 'user2@gmail.com',
        password: '*2ErGq',
        name: 'Default Name',
      },
      timestamp: '02/02/2025 21:55:16',
      path: '/api/core/v1/users',
      traceId: '41797cc8-2ded-4a0e-895f-9b3d2af1c413',
    },
  },
};

export const responseUpdateUserSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response example',
  schema: {
    example: {
      data: {
        email: 'user01@gmail.com',
        name: 'update1',
        isBan: true,
        password: '_HLy8}',
      },
      timestamp: '02/02/2025 23:10:15',
      path: '/api/core/v1/users/2',
      traceId: '0073e514-068e-47be-8da2-fa0302bdcfe0',
    },
  },
};
