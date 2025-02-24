import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseListPermissionSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response list permission success',
  schema: {
    example: {
      data: [
        {
          id: 'NOTIFICATION_UPDATE',
          description: 'Update notification',
          createdAt: '2025-02-24T03:31:50.656Z',
          updatedAt: '2025-02-24T03:31:50.656Z',
        },
        {
          id: 'NOTIFICATION_CREATE',
          description: 'Create notification',
          createdAt: '2025-02-24T03:31:50.656Z',
          updatedAt: '2025-02-24T03:31:50.656Z',
        },
      ],
      timestamp: '24/02/2025 10:57:29',
      path: '/api/core/v1/permissions',
      traceId: 'cc613cd7-c427-4ca9-a8c2-04bb00c0ea00',
    },
  },
};
