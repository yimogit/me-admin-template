/**
 * 管理员列表
 *
 * @url /system/admin/list
 * GET
 */
module.exports = {
  status: 1,
  data: {
    'rows|5': [
      {
        adminName: '@cname',
        isEnable: '@boolean',
        createdAt: '@datetime',
        'roleIds|1-3': [1, 2, 3]
      }
    ],
    total: 30
  }
}
