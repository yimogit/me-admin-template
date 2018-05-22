import directives from '../directives'
import components from '../components'
import filters from '../filters'

import * as $codes from './codes'
import * as $enums from './enums'
import $ui from './ui'
import $api from '../api'

const install = function(Vue, options) {
  // 注册全局指令，过滤器，组件
  Object.keys(directives).forEach(e => Vue.directive(e, directives[e]))
  Object.keys(filters).forEach(e => Vue.filter(e, filters[e]))
  Object.keys(components).forEach(e => Vue.component(e, components[e]))

  // 项目扩展 $api, $ui, $code, $enum
  var allExtends = { $api, $ui, $codes, $enums }
  Object.keys(allExtends).forEach(e => {
    const plugin = {}
    plugin[e] = {
      get() {
        return allExtends[e]
      }
    }
    Object.defineProperties(Vue.prototype, plugin)
  })
}

export default {
  install
}
