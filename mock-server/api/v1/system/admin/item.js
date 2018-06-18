/**
 * 管理员信息
 *
 * @url /system/admin/item
 * GET
 */
module.exports = {
  status: 1,
  data: {
    id: '@increment',
    adminName: '@cname',
    isEnable: '@boolean()',
    createdAt: '@datetime',
    roleIds: [1, '2'],
    remark: '测试。。。'
  }
}
