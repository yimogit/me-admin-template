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
        menuIcon: null,
        menuCode: 'home',
        menuUrl: null
      },
      {
        menuId: 2,
        menuName: '系统管理',
        menuIcon: null,
        children: [
          {
            menuId: 3,
            menuName: '管理员管理',
            menuIcon: null,
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
      }
    ],
    modules: [
      'home',
      'system_admin_list',
      'system_admin_create',
      'system_admin_edit',
      'system_role_create'
    ]
  }
}
