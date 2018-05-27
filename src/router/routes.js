import Layout from '@/views/layout/Layout'
import moduleRouter from './modules'
const _import = require('./_import_' + process.env.NODE_ENV)
// 除菜单之外的路由
const otherRouter = [
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
const homeRouter = [
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
  }
]

export const routes = moduleRouter.concat([...homeRouter, ...otherRouter])
