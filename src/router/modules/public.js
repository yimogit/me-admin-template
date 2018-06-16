import Layout from '@/components/VLayout/Index.vue'
const _import = require('../_import_' + process.env.NODE_ENV)
export const homeRouter = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: _import('dashboard/index'),
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: _import('public/login'),
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
    path: '/public/test',
    name: 'public_test',
    component: _import('public/test'),
    meta: {
      auth: false
    }
  }
]
