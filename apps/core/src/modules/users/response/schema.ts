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
            id: 23,
            email: 'user17@gmail.com',
            name: 'user17',
            isBan: false,
            createdAt: '2025-02-25T01:45:59.649Z',
            isJoinGroup: false,
          },
          {
            id: 22,
            email: 'user16@gmail.com',
            name: 'user16',
            isBan: false,
            createdAt: '2025-02-24T16:51:45.589Z',
            isJoinGroup: false,
          },
          {
            id: 21,
            email: 'user15@gmail.com',
            name: 'user15',
            isBan: false,
            createdAt: '2025-02-24T16:20:53.773Z',
            isJoinGroup: false,
          },
          {
            id: 17,
            email: 'user14@gmail.com',
            name: 'user14',
            isBan: false,
            createdAt: '2025-02-24T16:16:56.315Z',
            isJoinGroup: false,
          },
          {
            id: 16,
            email: 'user13@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-23T04:23:57.155Z',
            isJoinGroup: false,
          },
          {
            id: 13,
            email: 'user12@gmail.com',
            name: 'Hien',
            isBan: false,
            createdAt: '2025-02-03T04:02:48.103Z',
            isJoinGroup: false,
          },
          {
            id: 12,
            email: 'user11@gmail.com',
            name: 'HAI test',
            isBan: false,
            createdAt: '2025-02-02T15:22:26.415Z',
            isJoinGroup: false,
          },
          {
            id: 11,
            email: 'user10@gmail.com',
            name: 'Default Name',
            isBan: true,
            createdAt: '2025-02-02T15:22:25.124Z',
            isJoinGroup: false,
          },
          {
            id: 10,
            email: 'user9@gmail.com',
            name: 'Default Name',
            isBan: true,
            createdAt: '2025-02-02T15:22:23.174Z',
            isJoinGroup: false,
          },
          {
            id: 9,
            email: 'user8@gmail.com',
            name: 'Default Name',
            isBan: true,
            createdAt: '2025-02-02T15:22:21.816Z',
            isJoinGroup: false,
          },
          {
            id: 8,
            email: 'user7@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:20.243Z',
            isJoinGroup: false,
          },
          {
            id: 7,
            email: 'user6@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:18.420Z',
            isJoinGroup: true,
          },
          {
            id: 6,
            email: 'user5@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:16.928Z',
            isJoinGroup: true,
          },
          {
            id: 5,
            email: 'user4@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:22:11.309Z',
            isJoinGroup: true,
          },
          {
            id: 4,
            email: 'user3@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T15:21:41.294Z',
            isJoinGroup: true,
          },
          {
            id: 3,
            email: 'user2@gmail.com',
            name: 'Default Name',
            isBan: false,
            createdAt: '2025-02-02T14:55:16.349Z',
            isJoinGroup: true,
          },
          {
            id: 2,
            email: 'user01@gmail.com',
            name: 'update1',
            isBan: false,
            createdAt: '2025-02-02T14:54:27.813Z',
            isJoinGroup: true,
          },
        ],
        totalPage: 1,
        totalItems: 17,
      },
      timestamp: '28/02/2025 08:37:33',
      path: '/api/core/v1/users?search=user',
      traceId: 'f379694a-70b8-4353-9340-3b31ab3230e8',
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

export const responseDetailUserSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 5,
        email: 'user4@gmail.com',
        name: 'Default Name',
        isBan: false,
        createdAt: '2025-02-02T15:22:11.309Z',
        role: 'USER',
        permissionGroups: [],
        userGroup: [
          {
            groupId: '2d3b8212-4981-4ba8-b667-a07b98e565a0',
            role: 'STAFF',
            leaderId: 3,
            status: 'ACTIVE',
            group: {
              name: 'GR SP 22',
              type: 'SUPPORT',
            },
            userGroupSupport: [
              {
                groupSupportId: '46097793-3017-4a8f-bfa1-069e29dbd870',
              },
            ],
          },
        ],
        permissionsUser: [],
      },
      timestamp: '28/02/2025 08:47:23',
      path: '/api/core/v1/users/5',
      traceId: 'c01d9e22-a8f3-480a-8fc7-3cce552abe84',
    },
  },
};

export const responseStatisticsUserSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response example',
  schema: {
    example: {
      data: {
        id: 21,
        name: 'user15',
        email: 'user15@gmail.com',
        _count: {
          Order: 4,
        },
        orderStateCount: {
          CANCELED: {
            count: 1,
            totalPrice: 2000000,
          },
          COMPLETED: {
            count: 1,
            totalPrice: 60000000,
          },
        },
        categoryStatistics: {
          FACEBOOK: {
            CANCELED: {
              totalQuantity: 10,
              totalPrice: 2000000,
            },
            COMPLETED: {
              totalQuantity: 120,
              totalPrice: 60000000,
            },
          },
        },
      },
      timestamp: '07/03/2025 23:16:21',
      path: '/api/core/v1/users/21/stats?startTime=2025-03-06%2015:06:50.737&endTime=2025-03-07%2015:42:15.490',
      traceId: '362fed58-32c9-44b0-b75d-5da54d1d5a9f',
    },
  },
};
