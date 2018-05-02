// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import directives from './directives'
import components from './components'
import filters from './filters'
import store from './store'
import api from './api'
import plugin from './plugin'

Vue.config.productionTip = false

// this.$fetch
Vue.use(api)
// this.$plugin
Vue.use(plugin)
// 注册指令，过滤器，组件
Object.keys(directives).forEach(e => Vue.directive(e, directives[e]))
Object.keys(filters).forEach(e => Vue.filter(e, filters[e]))
Object.keys(components).forEach(e => Vue.component(e, components[e]))

window.__currentApp = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
