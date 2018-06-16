import { getInfo } from '@/api/modules/account'
const beforeEach = (to, from, next) => {
  if (!to.meta.auth) {
    return next()
  }
  if (!localStorage.token) {
    return next('/login')
  }
  if (window.authInfo && window.authInfo.info) return next()
  getInfo().then(res => {
    localStorage.token = res.data.info.token
    window.authInfo = {
      info: res.data.info,
      menus: res.data.menus,
      modules: res.data.modules
    }
    next()
  })
}
const afterEach = (to, from) => {}

export default {
  beforeEach,
  afterEach
}
