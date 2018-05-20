import * as $codes from '@/_extends/codes'
import Layout from '@/views/layout/Layout'
const _import = require('./_import_' + process.env.NODE_ENV)
// 除菜单之外的路由
export const otherRouter = [
  {
    path: '/login',
    name: 'login',
    component: _import('account/login'),
    meta: {
      auth: false
    }
  },
  {
    path: '/404',
    name: '404',
    component: _import('public/404'),
    meta: {
      auth: false
    }
  },
  {
    path: '/test',
    name: 'test',
    component: _import('public/test'),
    meta: {
      auth: false
    }
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      auth: false
    }
  }
]

export const appRouter = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: _import('dashboard/index'),
        meta: { defAuth: true, auth: true }
      }
    ]
  },
  {
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
        path: 'admin/add',
        name: $codes.system.admin_add_key,
        component: _import('system/admin/edit'),
        meta: {
          auth: true
        }
      },
      {
        path: 'admin/edit/:id',
        name: $codes.system.admin_edit_key,
        component: _import('system/admin/edit'),
        meta: {
          auth: true
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
]

export const routes = [...appRouter, ...otherRouter]
