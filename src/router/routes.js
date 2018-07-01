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
var allModules = moduleRouter.concat(otherRouter)
export const routes = allModules
