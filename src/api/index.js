import * as api_test from './test'

const apiObj = {
  api_test
}

const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiObj
      }
    }
  })
}
export default {
  install
}
