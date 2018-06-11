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
    }
  ]
}
