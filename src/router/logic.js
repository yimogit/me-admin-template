import { getInfo } from '@/api/modules/account'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
const beforeEach = (to, from, next) => {
  NProgress.start()
  if (!to.meta.auth) {
    return next()
  }
  if (!localStorage.token) {
    return next('/login')
  }
  //测试登录即可
  if (to.path.indexOf('/test') === 0) {
    return next()
  }
  if (checkAuth(to.name)) return next()
  getInfo().then(res => {
    localStorage.token = res.data.info.token
    window.authInfo = {
      info: res.data.info,
      menus: res.data.menus,
      modules: res.data.modules
    }
    checkAuth(to.name) ? next() : next('/login')
  })
}
const afterEach = (to, from) => {
  NProgress.done()
}

function checkAuth(code) {
  return (
    window.authInfo &&
    window.authInfo.modules &&
    window.authInfo.modules.indexOf(code) > -1
  )
}

export default {
  beforeEach,
  afterEach
}
