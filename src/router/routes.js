import moduleRouter from './modules'
// 除菜单之外的路由
const otherRouter = [
  {
    path: '*',
    redirect: '/404',
    meta: {
      auth: false
    }
  }
]
var allModules = moduleRouter
if (process.env.NODE_ENV === 'development') {
  const testRoutes = require('@/views/test/routes.js')
  allModules.push(testRoutes.default)
}
allModules = allModules.concat([...otherRouter])
export const routes = allModules
