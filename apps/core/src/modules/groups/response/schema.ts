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
        id: '2d3b8212-4981-4ba8-b667-a07b98e565a0',
        name: 'GR SP 22',
        description: null,
        status: 'ACTIVE',
        createdAt: '2025-02-26T15:36:40.566Z',
        updatedAt: '2025-02-27T08:52:40.521Z',
        users: [
          {
            userId: 2,
            status: 'ACTIVE',
            role: 'MANAGER',
            leaderId: null,
            user: {
              id: 2,
              name: 'update1',
              email: 'user01@gmail.com',
              isBan: false,
            },
            userGroupSupport: [],
          },
          {
            userId: 4,
            status: 'ACTIVE',
            role: 'MANAGER',
            leaderId: null,
            user: {
              id: 4,
              name: 'Default Name',
              email: 'user3@gmail.com',
              isBan: false,
            },
            userGroupSupport: [],
          },
          {
            userId: 3,
            status: 'ACTIVE',
            role: 'LEADER',
            leaderId: null,
            user: {
              id: 3,
              name: 'Default Name',
              email: 'user2@gmail.com',
              isBan: false,
            },
            userGroupSupport: [],
          },
          {
            userId: 7,
            status: 'ACTIVE',
            role: 'LEADER',
            leaderId: null,
            user: {
              id: 7,
              name: 'Default Name',
              email: 'user6@gmail.com',
              isBan: false,
            },
            userGroupSupport: [],
          },
          {
            userId: 14,
            status: 'ACTIVE',
            role: 'LEADER',
            leaderId: null,
            user: {
              id: 14,
              name: 'Alex',
              email: 'aaa@gmail.com',
              isBan: false,
            },
            userGroupSupport: [],
          },
          {
            userId: 5,
            status: 'ACTIVE',
            role: 'STAFF',
            leaderId: 3,
            user: {
              id: 5,
              name: 'Default Name',
              email: 'user4@gmail.com',
              isBan: false,
            },
            userGroupSupport: [
              {
                groupSupportId: '46097793-3017-4a8f-bfa1-069e29dbd870',
              },
            ],
          },
          {
            userId: 6,
            status: 'ACTIVE',
            role: 'STAFF',
            leaderId: 3,
            user: {
              id: 6,
              name: 'Default Name',
              email: 'user5@gmail.com',
              isBan: false,
            },
            userGroupSupport: [
              {
                groupSupportId: 'a4cfa44b-ecf7-446a-8745-2e3cb274f1ad',
              },
            ],
          },
        ],
        supportOrderGroup: [
          {
            id: '46097793-3017-4a8f-bfa1-069e29dbd870',
            name: 'order2',
          },
          {
            id: 'a4cfa44b-ecf7-446a-8745-2e3cb274f1ad',
            name: 'GR O 1',
          },
        ],
      },
      timestamp: '27/02/2025 15:52:53',
      path: '/api/core/v1/groups/2d3b8212-4981-4ba8-b667-a07b98e565a0',
      traceId: '3b00b22b-33a0-44d4-a168-b10c2fe07550',
    },
  },
};

export const responseUpdateGroupSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: '2d3b8212-4981-4ba8-b667-a07b98e565a0',
        name: 'GR SP 22',
        description: null,
        status: 'ACTIVE',
        type: 'SUPPORT',
        createBy: 1,
        createdAt: '2025-02-26T15:36:40.566Z',
        updatedAt: '2025-02-27T09:11:50.709Z',
      },
      timestamp: '27/02/2025 16:11:51',
      path: '/api/core/v1/groups/2d3b8212-4981-4ba8-b667-a07b98e565a0',
      traceId: 'e6854657-6f8a-4a0b-8a55-75358d8a0016',
    },
  },
};
