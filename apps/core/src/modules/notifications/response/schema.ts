import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseCreateNotificationSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        id: '4a35b0ac-3f82-4db3-9e7d-393d6f594594',
        title: 'title2',
        content: 'content2',
        type: 'ALL_USER',
        status: 'HIDE',
        iconType: null,
        iconUrl: null,
        createBy: 1,
        createdAt: '2025-02-23T04:11:22.391Z',
        updatedAt: '2025-02-23T04:11:22.391Z',
      },
      timestamp: '23/02/2025 11:11:22',
      path: '/api/core/v1/notifications',
      traceId: '926e0682-baa0-4fdd-91f3-6b6a8e688c03',
    },
  },
};

export const responseListNotificationSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response register success example',
  schema: {
    example: {
      data: {
        page: 1,
        limit: 20,
        data: [
          {
            id: '942b5166-257f-4eda-b4dc-ce4af47f6647',
            title: 'title1',
            content: 'content1',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: null,
            iconUrl: null,
            createBy: 1,
            createdAt: '2025-02-23T04:11:01.733Z',
            updatedAt: '2025-02-23T04:11:01.733Z',
          },
          {
            id: '4a35b0ac-3f82-4db3-9e7d-393d6f594594',
            title: 'title2',
            content: 'content2',
            type: 'ALL_USER',
            status: 'HIDE',
            iconType: null,
            iconUrl: null,
            createBy: 1,
            createdAt: '2025-02-23T04:11:22.391Z',
            updatedAt: '2025-02-23T04:11:22.391Z',
          },
        ],
        totalPage: 1,
        totalItems: 2,
      },
      timestamp: '23/02/2025 11:24:35',
      path: '/api/core/v1/notifications',
      traceId: 'dc030e50-6211-46f9-a8c4-1d779b4f0de2',
    },
  },
};
