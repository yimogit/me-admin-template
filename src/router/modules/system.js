import $codes from '@/_extends/codes'
import Layout from '@/views/layout/Layout'
const _import = require('../_import_' + process.env.NODE_ENV)
export default {
  path: '/system',
  component: Layout,
  children: [
    {
      path: 'admin/list',
      name: $codes.system.admin_list_key,
      component: _import('system/admin/list'),
      meta: {
        auth: true
      }
    },
    {
      path: 'admin/create',
      name: $codes.system.admin_create_key,
      component: _import('system/admin/edit'),
      meta: {
        auth: true,
        pname: $codes.system.admin_list_key
      }
    },
    {
      path: 'admin/edit/:id',
      name: $codes.system.admin_edit_key,
      component: _import('system/admin/edit'),
      meta: {
        auth: true,
        pname: $codes.system.admin_list_key
      }
    },
    {
      path: 'role/list',
      name: $codes.system.role_list_key,
      component: _import('system/role/list'),
      meta: {
        auth: true
      }
    }
  ]
}
