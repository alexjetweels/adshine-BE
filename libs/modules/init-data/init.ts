// Permission default
export const PERMISSION_DEFAULT = {
  GROUP_CREATE: {
    description: 'Tạo nhóm mới',
  },
  GROUP_VIEW: {
    description:
      'Xem thông tin nhóm, người có quyền này đc xem tất cả các nhóm hoặc trường hợp người trong nhóm chỉ xem được nhóm của mình!',
  },
  GROUP_UPDATE: {
    description:
      'Chỉnh sửa thông tin nhóm, MANAGER cũng có thể chỉnh sửa nhóm (bao gồm thêm người với role thấp hơn mình vào nhóm)',
  },
  GROUP_DELETE: {
    description: 'Xóa nhóm',
  },
  USER_CREATE: {
    description: 'Tạo người dùng mới, thêm quyền cho người dùng',
  },
  USER_UPDATE: {
    description:
      'Chỉnh sửa thông tin người dùng, bao gồm chỉnh sửa thông tin cơ bản, xóa người dùng, update quyền cho người dùng',
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
    description:
      'Chỉnh sửa thông tin đơn hàng, xóa đơn hàng, đối với người tạo đơn hàng sẽ được xóa đơn hàng trong 1 số trường hợp nhất định',
  },
};

// PermissionDefaultType
export type PermissionDefaultType = typeof PERMISSION_DEFAULT;
export type KeyPermissionDefaultType = keyof typeof PERMISSION_DEFAULT;
export const PERMISSION_KEYS = Object.fromEntries(
  Object.keys(PERMISSION_DEFAULT).map((key) => [key, key]),
) as { [K in KeyPermissionDefaultType]: K };
