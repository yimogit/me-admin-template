## 组件-指令-过滤器-插件的注册与使用

为了更方便的在页面中使用组件等，一般将一些通用的东西放到 components/directives/filters 文件夹中并将其通过 index.js 导出

```js
export default {
  key: 'value'
}
```

### 在 main.js 注册

```js
import Vue from 'vue'
import directives from './directives'
import components from './components'
import filters from './filters'
// 注册指令，过滤器，组件
Object.keys(directives).forEach(e => Vue.directive(e, directives[e]))
Object.keys(filters).forEach(e => Vue.filter(e, filters[e]))
Object.keys(components).forEach(e => Vue.component(e, components[e]))
```

### 关于插件的编写

有时候问了方便的调用接口，通用的方法等，将其挂载到 `vue` 实例上，可以方便的使用 `this` 变量进行方法调用

### 插件创建示例

```js
const pluginObj = {
  func: () => {
    console.log('233')
  }
}
const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $plugin: {
      get() {
        return pluginObj
      }
    }
  })
}
export default {
  install
}
```

### 插件安装

在 main.js 中时 `Vue.use(plugin)` 安装插件即可将其挂载到 vue 实例

### 插件调用

```js
this.$plugin.func()
```
