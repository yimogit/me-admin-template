import * as ui from './ui'

const pluginObj = {
  ui
}

const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $meadmin: {
      get() {
        return pluginObj
      }
    }
  })
}
export default {
  install
}
