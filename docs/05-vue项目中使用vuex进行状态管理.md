## vuex 安装

官方文档：https://vuex.vuejs.org/zh-cn/  
安装命令：`npm install vuex --save`

## vuex 的使用

### 创建 store 封装 vuex

新建 store 文件夹，创建 index.js 导出 vuex 的 getters,modules,actions

```js
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    app
  },
  strict: process.env.NODE_ENV !== 'production'
})
```

### 添加 getters 获取全局状态

getters 获取全局状态，使用：`$store.getters.test`

```js
const getters = {
  test: state => state.app.test
}
export default getters
```

### 添加模块 modules/app

模块中的方法可通过调用 `this.$store.dispatch('changeTestValue')` 触发更新  
注：`Vue.set(state, 'test', state.test)` 对象需要 set 下才能更新视图绑定的状态

```js
import Vue from 'vue'
const TEST_KEY = 'TEST_KEY'
const appStore = {
  state: {
    test: {
      value: !+localStorage.getItem(TEST_KEY)
    }
  },
  mutations: {
    TEST_CHANGE: (state, value) => {
      localStorage.setItem(TEST_KEY, value)
      state.test.value = value

      // 对象需强制更新视图
      Vue.set(state, 'test', state.test)
    }
  },
  actions: {
    changeTestValue: ({ commit }) => {
      commit('TEST_CHANGE', Date.now())
    }
  }
}
export default appStore
```

### 在 main.js 中引入 store

```js
import store from './store'
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
```
