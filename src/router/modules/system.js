import Layout from '@/components/VLayout/Index.vue'
const _import = require('../_import_' + process.env.NODE_ENV)
export default {
  path: '/system',
  component: Layout,
  children: [
    {
      path: 'admin/list',
      name: 'system_admin_list',
      component: _import('system/admin/list'),
      meta: {
        auth: true
      }
    },
    {
      path: 'admin/create',
      name: 'admin_create',
      component: _import('system/admin/edit'),
      meta: {
        auth: true,
        title: '管理员创建',
        pname: 'system_admin_list'
      }
    },
    {
      path: 'admin/edit/:id',
      name: 'system_admin_edit',
      component: _import('system/admin/edit'),
      meta: {
        auth: true,
        title: '管理员编辑',
        pname: 'system_admin_list'
      }
    },
    {
      path: 'role/list',
      name: 'system_role_list',
      component: _import('system/role/list'),
      meta: {
        auth: true
      }
    }
  ]
}
