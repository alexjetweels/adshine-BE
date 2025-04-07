import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseCreatePostSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: '072121a7-4851-4be2-be92-5bc948271d18',
        title: 'How to stay productive',
        content:
          'Here are some tips to stay productive while working remotely...',
        type: 'TIP',
        status: 'HIDE',
        iconType: 'lightbulb',
        iconUrl: 'https://example.com/icons/productivity.png',
        createBy: 22,
        createdAt: '2025-04-07T13:22:57.265Z',
        updatedAt: '2025-04-07T13:22:57.265Z',
      },
      timestamp: '07/04/2025 20:22:57',
      path: '/api/core/v1/posts',
      traceId: '207e756d-2363-4288-9a77-27a0083388bc',
    },
  },
};

export const responseListPostSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: '43b1cf3b-e9fb-4a7f-8479-b856fb15806f',
            title: 'How to stay productive',
            type: 'TIP',
            status: 'HIDE',
            iconType: 'lightbulb',
            createdAt: '2025-04-07T13:35:15.436Z',
            updatedAt: '2025-04-07T13:35:15.436Z',
            create: {
              id: 22,
              name: 'user16',
              email: 'user16@gmail.com',
            },
          },
          {
            id: 'ac821b86-0512-452c-890a-3f50dab8a527',
            title: 'How to stay productive',
            type: 'TIP',
            status: 'HIDE',
            iconType: 'lightbulb',
            createdAt: '2025-04-07T13:34:43.048Z',
            updatedAt: '2025-04-07T13:34:43.048Z',
            create: {
              id: 22,
              name: 'user16',
              email: 'user16@gmail.com',
            },
          },
          {
            id: '88cb31c1-c8f7-4e19-8788-1a32b59d6524',
            title: 'How to stay productive',
            type: 'TIP',
            status: 'HIDE',
            iconType: 'lightbulb',
            createdAt: '2025-04-07T13:34:06.455Z',
            updatedAt: '2025-04-07T13:34:06.455Z',
            create: {
              id: 22,
              name: 'user16',
              email: 'user16@gmail.com',
            },
          },
          {
            id: '072121a7-4851-4be2-be92-5bc948271d18',
            title: 'How to stay productive',
            type: 'TIP',
            status: 'HIDE',
            iconType: 'lightbulb',
            createdAt: '2025-04-07T13:22:57.265Z',
            updatedAt: '2025-04-07T13:22:57.265Z',
            create: {
              id: 22,
              name: 'user16',
              email: 'user16@gmail.com',
            },
          },
        ],
        totalPage: 1,
        totalItems: 4,
      },
      timestamp: '07/04/2025 21:22:34',
      path: '/api/core/v1/posts',
      traceId: '8168f19c-812b-4c0e-ab1d-c3d2755bfe1b',
    },
  },
};

export const responseDetailPostSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: '43b1cf3b-e9fb-4a7f-8479-b856fb15806f',
        title: 'How to stay productive',
        content:
          'Here are some tips to stay productive while working remotely...',
        type: 'TIP',
        status: 'HIDE',
        iconType: 'lightbulb',
        iconUrl: 'https://example.com/icons/productivity.png',
        createBy: 22,
        createdAt: '2025-04-07T13:35:15.436Z',
        updatedAt: '2025-04-07T13:35:15.436Z',
      },
      timestamp: '07/04/2025 21:24:19',
      path: '/api/core/v1/posts/43b1cf3b-e9fb-4a7f-8479-b856fb15806f',
      traceId: '5ee375ff-8340-4a6c-a16b-3e9fb5b53d6d',
    },
  },
};
