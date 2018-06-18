/**
 * 角色列表
 *
 * @url /system/role/list
 * GET
 */
module.exports = {
  status: 1,
  data: {
    rows: [
      {
        id: 1,
        roleName: '管理员',
        isEnable: '@boolean',
        createdAt: '@datetime'
      },
      {
        id: 2,
        roleName: '测试',
        isEnable: '@boolean',
        createdAt: '@datetime'
      }
    ],
    total: 2
  }
}
