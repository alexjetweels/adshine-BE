import { P } from 'pino';

// Permission default
export const PERMISSION_DEFAULT = {
  USER_CREATE: {
    description: 'Tạo người dùng mới',
  },
  USER_UPDATE: {
    description: 'Chỉnh sửa thông tin người dùng',
  },
  USER_VIEW: {
    description: 'Xem thông tin người dùng',
  },
  PERMISSION_GROUP_CREATE: {
    description: 'Tạo nhóm quyền để phân quyền cho người dùng',
  },
  PERMISSION_GROUP_UPDATE: {
    description: 'Chỉnh sửa nhóm quyền',
  },
  PERMISSION_GROUP_VIEW: {
    description: 'Xem nhóm quyền',
  },
  PERMISSION_GROUP_DELETE: {
    description: 'Xóa nhóm quyền',
  },
  NOTIFICATION_CREATE: {
    description: 'Tạo thông báo',
  },
  NOTIFICATION_UPDATE: {
    description: 'Chỉnh sửa thông báo bao gồm cả ẩn hiện thông báo',
  },
  PRODUCT_CREATE: {
    description: 'Tạo sản phẩm mới',
  },
  PRODUCT_UPDATE: {
    description: 'Chỉnh sửa thông tin sản phẩm, bao gồm xoá sản phẩm',
  },
  ORDER_CREATE: {
    description: 'Tạo đơn hàng mới',
  },
  ORDER_UPDATE: {
    description: 'Chỉnh sửa thông tin đơn hàng',
  },
};

// PermissionDefaultType
export type PermissionDefaultType = typeof PERMISSION_DEFAULT;
export type KeyPermissionDefaultType = keyof typeof PERMISSION_DEFAULT;
export const PERMISSION_KEYS = Object.fromEntries(
  Object.keys(PERMISSION_DEFAULT).map((key) => [key, key]),
) as { [K in KeyPermissionDefaultType]: K };
