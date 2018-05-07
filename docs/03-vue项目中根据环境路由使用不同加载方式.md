## 为何要根据环境路由使用不同加载方式

使用 vue-router 在写路由的时候大部分都会使用路由懒加载的方式，优化首屏加载速度等好处不言而喻。[路由懒加载-详细介绍](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html)

在生成环境使用自然美滋滋，但是开发环境稍微改动代码就会触发热更新，然后因为路由懒加载 【导致 webpack 每次的 cache 失效】,当你有几十个页面的时候重新生成是严重影响效率的

## 不同环境使用不同加载方式的解决方案

不需要懒加载的环境配置(`_import_development.js`)：`module.exports = file => require('@/views/' + file + '.vue').default`
需要懒加载的环境配置(`_import_production.js`)：`module.exports = file => () => import('@/views/' + file + '.vue')`
在路由中引用：

```js
const _import = require('./_import_' + process.env.NODE_ENV)
//...
  { path: '/404', name: '404', component: _import('public/404') },
//...
```

## 说明

关于原因和解决方案是看到[PanJiaChen 的手摸手系列文章](https://segmentfault.com/a/1190000010043013)得已解惑，里面有详细说明，推荐其[专栏文章](https://segmentfault.com/blog/hand-to-hand),里面很多干货
