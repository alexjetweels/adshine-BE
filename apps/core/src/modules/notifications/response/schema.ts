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
            id: 'f9f8dbb7-7465-422a-83ab-99c2316f1624',
            title: 'H1 test test',
            content: 'bakakakakakkaka',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: 'error',
            createdAt: '2025-02-26T01:17:18.857Z',
            updatedAt: '2025-02-26T16:24:43.700Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
          {
            id: '9bbb13b7-1740-4681-ac89-ceaf4bda5726',
            title: 'Pickaball',
            content: 'Anh Hẹn em pickable để đưa sang campuchia ',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: 'info',
            createdAt: '2025-02-25T16:28:35.799Z',
            updatedAt: '2025-02-25T16:42:27.193Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
          {
            id: '942b5166-257f-4eda-b4dc-ce4af47f6647',
            title: 'title2xx',
            content: 'content2xxx',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: 'warning',
            createdAt: '2025-02-23T04:11:01.733Z',
            updatedAt: '2025-02-26T16:24:45.529Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
          {
            id: '8016a6ec-0d3a-4e5b-be67-82b4ddd52fd8',
            title: 'Thông báo ',
            content:
              'Sanders is one of the most popular politicians in the US, and his political analysis and messaging remain as relevant and compelling as ever. But while his Tour to Fight Oligarchy is inspiring and important, the broad left badly needs a political vision that goes beyond Sanders.',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: 'error',
            createdAt: '2025-02-27T02:36:59.158Z',
            updatedAt: '2025-02-27T02:36:59.158Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
          {
            id: '7d9a2246-3766-4929-bedf-dce2a14b55e6',
            title: 'Tạo thông thêm ',
            content: 'Thông báo này gửi tới toàn thể user ',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: 'success',
            createdAt: '2025-02-25T16:48:52.134Z',
            updatedAt: '2025-02-26T16:24:47.486Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
          {
            id: '4a35b0ac-3f82-4db3-9e7d-393d6f594594',
            title: 'title2',
            content: 'content2',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: null,
            createdAt: '2025-02-23T04:11:22.391Z',
            updatedAt: '2025-02-26T16:24:49.102Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
          {
            id: '4097316c-f59e-41f4-a4cd-8c3e7c7b853e',
            title: '111111',
            content: 'asasasaasassasasaassaaa',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: 'error',
            createdAt: '2025-02-27T02:35:20.943Z',
            updatedAt: '2025-02-27T02:35:20.943Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
          {
            id: '2e3540bf-3b04-4f73-92d0-78b84f7b2068',
            title: 'H2 test test',
            content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            type: 'ALL_USER',
            status: 'SHOW',
            iconType: 'warning',
            createdAt: '2025-02-26T01:21:21.825Z',
            updatedAt: '2025-02-26T16:24:51.040Z',
            create: {
              id: 1,
              name: 'Admin',
              email: 'admin@gmail.com',
            },
          },
        ],
        totalPage: 1,
        totalItems: 8,
      },
      timestamp: '28/02/2025 08:25:08',
      path: '/api/core/v1/notifications',
      traceId: '119ed81d-e700-4316-991e-619af110687e',
    },
  },
};
