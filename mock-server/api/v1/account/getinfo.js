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
        menuId: '@increment',
        menuName: '控制台',
        menuIcon: 'el-icon-menu',
        menuCode: 'home',
        menuUrl: null
      },
      {
        menuId: '@increment',
        menuName: '系统管理',
        menuIcon: 'el-icon-setting',
        children: [
          {
            menuId: '@increment',
            menuName: '管理员管理',
            menuIcon: 'null',
            children: [
              {
                menuId: '@increment',
                menuName: '管理员列表',
                menuIcon: null,
                menuCode: 'system_admin_list',
                menuUrl: null
              }
            ]
          },
          {
            menuId: '@increment',
            menuName: '角色列表',
            menuIcon: null,
            menuCode: 'system_role_list',
            menuUrl: null
          }
        ]
      },
      {
        menuId: '@increment',
        menuName: '组件',
        menuIcon: 'el-icon-menu',
        children: [
          {
            menuId: '@increment',
            menuName: '权限按钮',
            menuIcon: null,
            menuCode: '',
            menuUrl: '/test/button'
          },
          {
            menuId: '@increment',
            menuName: '下拉框',
            menuIcon: null,
            menuCode: '',
            menuUrl: '/test/select'
          },
          {
            menuId: '@increment',
            menuName: '表格',
            menuIcon: null,
            menuCode: '',
            menuUrl: '/test/table-pager'
          },
          {
            menuId: '@increment',
            menuName: '上传',
            menuIcon: null,
            menuCode: '',
            menuUrl: '/test/upload'
          },
          {
            menuId: '@increment',
            menuName: '编辑器',
            menuIcon: null,
            menuCode: '',
            menuUrl: '/test/editor'
          }
        ]
      },
      {
        menuId: '@increment',
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
