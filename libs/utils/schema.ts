import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseSuccessBasic: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response example',
  schema: {
    example: {
      data: true,
      timestamp: '02/02/2025 21:10:20',
      path: '/api/core/v1/auth/change-password',
      traceId: 'be9dd909-5d16-4dc1-9ca5-10643b4e2467',
    },
  },
};
