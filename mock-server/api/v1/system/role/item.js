/**
 * 角色信息
 *
 * @url /system/role/item
 * GET
 */
module.exports = {
  status: 1,
  data: {
    id: '@increment',
    'roleName|1': ['管理员', '测试'],
    isEnable: '@boolean',
    createdAt: '@datetime'
  }
}
