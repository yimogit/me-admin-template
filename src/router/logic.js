import { getInfo } from '@/api/modules/account'
const beforeEach = (to, from, next) => {
  if (!to.meta.auth) {
    return next()
  }
  if (!localStorage.token) {
    return next('/login')
  }
  if (checkAuth(to.name)) return next()
  getInfo().then(res => {
    localStorage.token = res.data.info.token
    window.authInfo = {
      info: res.data.info,
      menus: res.data.menus,
      modules: res.data.modules
    }
    checkAuth(to.name) ? next():next('/login')
  })
}
const afterEach = (to, from) => {}

function checkAuth(code){
  return window.authInfo && window.authInfo.info && window.authInfo.modules.indexOf(to.name)>-1
}

export default {
  beforeEach,
  afterEach
}
