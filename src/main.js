// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import _extends from './_extends'

// 项目扩展
// Vue.use(_extends) 或者调用 register
_extends.register(Vue)

Vue.config.productionTip = false

window.__currentApp = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
