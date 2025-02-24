// Permission default
export const PERMISSION_DEFAULT = {
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
  USER_PERMISSION_GROUP: {
    description:
      'Phân quyền cho người dùng gồm thêm, sửa, xóa nhóm quyền của người dùng',
  },
  NOTIFICATION_CREATE: {
    description: 'Tạo thông báo',
  },
  NOTIFICATION_UPDATE: {
    description: 'Chỉnh sửa thông báo bao gồm cả ẩn hiện thông báo',
  },
};

// PermissionDefaultType
export type PermissionDefaultType = typeof PERMISSION_DEFAULT;
export type KeyPermissionDefaultType = keyof typeof PERMISSION_DEFAULT;
