// 页面/按钮权限模块定义
// 放到这里为了能够在页面中使用 $const.modules.system.admin_list_key
const admin = {
  admin_list_key: 'system-admin-list',
  admin_create_key: 'system-admin-create',
  admin_edit_key: 'system-admin-edit',
  admin_del_key: 'system-admin-del'
}
const role = {
  role_list_key: 'system-role-list',
  role_create_key: 'system-role-create',
  role_edit_key: 'system-role-edit',
  role_del_key: 'system-role-del'
}
export default {
  ...admin,
  ...role
}
