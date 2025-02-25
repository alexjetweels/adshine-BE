import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';

export const responseListPermissionSuccess: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Response list permission success',
  schema: {
    example: {
      data: {
        USER: [
          {
            id: 'USER_VIEW',
            description: 'Xem thông tin người dùng',
            createdAt: '2025-02-24T17:08:00.916Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
          {
            id: 'USER_UPDATE',
            description:
              'Chỉnh sửa thông tin người dùng, bao gồm chỉnh sửa thông tin cơ bản, xóa người dùng, update quyền cho người dùng',
            createdAt: '2025-02-24T17:08:00.916Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
          {
            id: 'USER_PERMISSION_GROUP',
            description:
              'Phân quyền cho người dùng gồm thêm, sửa, xóa nhóm quyền của người dùng',
            createdAt: '2025-02-24T10:06:13.656Z',
            updatedAt: '2025-02-24T10:06:13.656Z',
          },
          {
            id: 'USER_CREATE',
            description: 'Tạo người dùng mới, thêm quyền cho người dùng',
            createdAt: '2025-02-24T17:08:00.916Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
        ],
        PRODUCT: [
          {
            id: 'PRODUCT_VIEW',
            description: 'Xem thông tin sản phẩm',
            createdAt: '2025-02-24T17:34:59.674Z',
            updatedAt: '2025-02-24T17:34:59.674Z',
          },
          {
            id: 'PRODUCT_UPDATE',
            description: 'Chỉnh sửa thông tin sản phẩm, bao gồm xoá sản phẩm',
            createdAt: '2025-02-24T17:34:28.452Z',
            updatedAt: '2025-02-25T04:12:13.366Z',
          },
          {
            id: 'PRODUCT_CREATE',
            description: 'Tạo sản phẩm mới',
            createdAt: '2025-02-24T17:34:25.499Z',
            updatedAt: '2025-02-25T04:12:13.366Z',
          },
        ],
        PERMISSION: [
          {
            id: 'PERMISSION_GROUP_VIEW',
            description: 'Xem nhóm quyền',
            createdAt: '2025-02-24T10:06:13.656Z',
            updatedAt: '2025-02-25T04:12:13.366Z',
          },
          {
            id: 'PERMISSION_GROUP_UPDATE',
            description: 'Chỉnh sửa nhóm quyền',
            createdAt: '2025-02-24T10:06:13.656Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
          {
            id: 'PERMISSION_GROUP_DELETE',
            description: 'Xóa nhóm quyền',
            createdAt: '2025-02-24T10:06:13.656Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
          {
            id: 'PERMISSION_GROUP_CREATE',
            description: 'Tạo nhóm quyền để phân quyền cho người dùng',
            createdAt: '2025-02-24T10:06:13.656Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
        ],
        ORDER: [
          {
            id: 'ORDER_UPDATE',
            description:
              'Chỉnh sửa thông tin đơn hàng, xóa đơn hàng, đối với người tạo đơn hàng sẽ được xóa đơn hàng trong 1 số trường hợp nhất định',
            createdAt: '2025-02-24T17:36:56.877Z',
            updatedAt: '2025-02-25T04:12:13.366Z',
          },
          {
            id: 'ORDER_CREATE',
            description: 'Tạo đơn hàng mới',
            createdAt: '2025-02-24T17:36:24.616Z',
            updatedAt: '2025-02-25T04:12:13.366Z',
          },
        ],
        NOTIFICATION: [
          {
            id: 'NOTIFICATION_UPDATE',
            description: 'Chỉnh sửa thông báo bao gồm cả ẩn hiện thông báo',
            createdAt: '2025-02-24T10:06:13.656Z',
            updatedAt: '2025-02-25T04:12:13.366Z',
          },
          {
            id: 'NOTIFICATION_CREATE',
            description: 'Tạo thông báo',
            createdAt: '2025-02-24T10:06:13.656Z',
            updatedAt: '2025-02-25T04:12:13.366Z',
          },
        ],
        GROUP: [
          {
            id: 'GROUP_VIEW',
            description:
              'Xem thông tin nhóm, người có quyền này đc xem tất cả các nhóm hoặc trường hợp người trong nhóm chỉ xem được nhóm của mình!',
            createdAt: '2025-02-25T04:09:23.149Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
          {
            id: 'GROUP_UPDATE',
            description:
              'Chỉnh sửa thông tin nhóm, MANAGER cũng có thể chỉnh sửa nhóm (bao gồm thêm người với role thấp hơn mình vào nhóm)',
            createdAt: '2025-02-25T04:09:23.149Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
          {
            id: 'GROUP_DELETE',
            description: 'Xóa nhóm',
            createdAt: '2025-02-25T04:09:23.149Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
          {
            id: 'GROUP_CREATE',
            description: 'Tạo nhóm mới',
            createdAt: '2025-02-25T04:09:23.149Z',
            updatedAt: '2025-02-25T04:12:13.365Z',
          },
        ],
      },
      timestamp: '25/02/2025 11:12:15',
      path: '/api/core/v1/permissions',
      traceId: '8f82e792-25d8-46f9-aa6d-bada349b5971',
    },
  },
};
