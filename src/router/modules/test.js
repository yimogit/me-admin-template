//process.env.LOAD_TEST_ROUTER === true 才挂载
export default {
  path: '/test',
  redirect: '/test/index',
  component: () => import('@/views/test/_Layout'),
  children: [
    {
      path: 'index',
      component: () => import('@/views/test/index'),
      meta: { auth: true }
    },
    {
      path: 'button',
      component: () => import('@/views/test/button'),
      meta: { auth: true }
    },
    {
      path: 'select',
      component: () => import('@/views/test/select'),
      meta: { auth: true }
    },
    {
      path: 'table-pager',
      component: () => import('@/views/test/table-pager'),
      meta: { auth: true }
    },
    {
      path: 'upload',
      component: () => import('@/views/test/upload'),
      meta: { auth: false }
    },
    {
      path: 'editor',
      component: () => import('@/views/test/editor'),
      meta: { auth: false }
    }
  ]
}
