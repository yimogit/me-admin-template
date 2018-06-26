/**
 * 用户信息
 *
 * @url /account/getinfo
 * GET
 */
module.exports = {
  status: 1,
  data: {
    info: {
      token: '@string(32)',
      adminName: 'administrator'
    },
    menus: [
      {
        menuId: 1,
        menuName: '控制台',
        menuIcon: 'el-icon-menu',
        menuCode: 'home',
        menuUrl: null
      },
      {
        menuId: 2,
        menuName: '系统管理',
        menuIcon: 'el-icon-setting',
        children: [
          {
            menuId: 3,
            menuName: '管理员管理',
            menuIcon: 'null',
            children: [
              {
                menuId: 4,
                menuName: '管理员列表',
                menuIcon: null,
                menuCode: 'system_admin_list',
                menuUrl: null
              }
            ]
          },
          {
            menuId: 6,
            menuName: '角色列表',
            menuIcon: null,
            menuCode: 'system_role_list',
            menuUrl: null
          }
        ]
      },
      {
        menuId: 11,
        menuName: '测试',
        menuIcon: 'el-icon-menu',
        menuCode: '',
        menuUrl: '/test'
      }
    ],
    modules: [
      'home',
      'system_admin_list',
      'system_admin_create',
      'system_admin_edit',
      'system_admin_del',
      'system_role_create',
      'system_role_del'
    ]
  }
}
