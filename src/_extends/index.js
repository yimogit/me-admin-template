import directives from '../directives'
import components from '../components'
import filters from '../filters'

import $codes from './codes'
import $enums from './enums'
import $ui from './ui'
import $api from '../api'

const register = function(_vue) {
  // 注册全局指令，过滤器，组件
  Object.keys(directives).forEach(e => _vue.directive(e, directives[e]))
  Object.keys(filters).forEach(e => _vue.filter(e, filters[e]))
  Object.keys(components).forEach(e => _vue.component(e, components[e]))

  // 项目扩展 $api, $ui, $codes, $enums
  var allExtends = { $api, $ui, $codes, $enums }
  Object.keys(allExtends).forEach(e => {
    const plugin = {}
    plugin[e] = {
      get() {
        return allExtends[e]
      }
    }
    Object.defineProperties(_vue.prototype, plugin)
  })
}
const install = e => register(e)

export default {
  install,
  register
}
