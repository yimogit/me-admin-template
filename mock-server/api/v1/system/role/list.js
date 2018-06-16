/**
 * 角色列表
 *
 * @url /system/role/list
 * GET
 */
module.exports = {
  status: 1,
  data: {
    'rows|5': [
      {
        'roleName|1': ['管理员', '超级管理员', '测试'],
        isEnable: '@boolean',
        createdAt: '@datetime'
      }
    ],
    total: 30
  }
}
