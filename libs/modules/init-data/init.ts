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
    description: 'Xóa hoặc khôi phục đơn hàng.',
  },
  ORDER_UPDATE_STATE: {
    description:
      'Chỉnh sửa trạng thái đơn hàng bao gồm xác nhận đã nhận hàng / hủy yêu cầu. (Trường hợp xác nhận đã giao hàng mặc định staff support order có quyền này)',
  },
  POST_UPDATE: {
    description: 'Update tip trick, tài liệu, phần mềm tiện ích',
  },
  POST_CREATE_TIP_TRICK: {
    description: 'Tạo bài viết tip trick mới',
  },
  POST_CREATE_SOFTWARE: {
    description: 'Tạo bài viết phần mềm tiện ích mới',
  },
  POST_CREATE_DOCUMENT: {
    description: 'Tạo bài viết tài liệu mới',
  },
  POST_VIEW_TIP_TRICK: {
    description: 'Xem bài viết tip trick',
  },
  POST_VIEW_SOFTWARE: {
    description: 'Xem bài viết phần mềm tiện ích',
  },
  POST_VIEW_DOCUMENT: {
    description: 'Xem bài viết tài liệu',
  },
};

// PermissionDefaultType
export type PermissionDefaultType = typeof PERMISSION_DEFAULT;
export type KeyPermissionDefaultType = keyof typeof PERMISSION_DEFAULT;
export const PERMISSION_KEYS = Object.fromEntries(
  Object.keys(PERMISSION_DEFAULT).map((key) => [key, key]),
) as { [K in KeyPermissionDefaultType]: K };
