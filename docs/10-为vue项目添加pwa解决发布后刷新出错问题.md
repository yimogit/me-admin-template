## 为 VUE 项目添加 PWA

> 为什么要添加？因为不管是部署在 iis，还是 nginx，每次应用部署后，再次访问因为旧的 js 已经不存在，所以页面访问的时候会整个报错，报错的结果就是一个白屏。为了解决这个问题，可以使用 PWA 来将 js 缓存到本地，再次发布成功后，service-worker.js 会使旧的 js 自动失效，重新请求并缓存 js。

注意：PWA 应用需要在本地上运行或者 https 协议下， 要保证你的页面是安全页面。

## 安装 PWA 的相关依赖包

yarn 安装

```
yarn add sw-precache-webpack-plugin --dev
yarn add uglify-es --dev
```

npm 安装

```
npm install sw-precache-webpack-plugin --dev-dev
npm install uglify-es --dev-dev
```

## build 目录添加相关配置

### service-worker-dev.js

```js
self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (let windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url)
    }
  })
})
```

### service-worker-prod

```js
;(function() {
  'use strict'

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors.
  var isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  )

  window.addEventListener('load', function() {
    if (
      'serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)
    ) {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(function(registration) {
          // updatefound is fired if service-worker.js changes.
          registration.onupdatefound = function() {
            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            if (navigator.serviceWorker.controller) {
              // The updatefound event implies that registration.installing is set
              var installingWorker = registration.installing

              installingWorker.onstatechange = function() {
                switch (installingWorker.state) {
                  case 'installed':
                    // At this point, the old content will have been purged and the
                    // fresh content will have been added to the cache.
                    // It's the perfect time to display a "New content is
                    // available; please refresh." message in the page's interface.
                    break

                  case 'redundant':
                    throw new Error(
                      'The installing ' + 'service worker became redundant.'
                    )

                  default:
                  // Ignore
                }
              }
            }
          }
        })
        .catch(function(e) {
          console.error('Error during service worker registration:', e)
        })
    }
  })
})()
```

### load-minified.js

```js
'use strict'

const fs = require('fs')
const UglifyJS = require('uglify-es')

module.exports = function(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8')
  const result = UglifyJS.minify(code)
  if (result.error) return ''
  return result.code
}
```

### 修改 webpack.prod.conf.js

首先引用`sw-precache-webpack-plugin`和`build/load-minified`

```
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const loadMinified = require('./load-minified')
```

为 webpack 插件 HtmlWebpackPlugin 添加参数 `` serviceWorkerLoader: `<script>${loadMinified( path.join(__dirname, './service-worker-prod.js'))}</script> ``

```js
  plugins: [
      ....
  new HtmlWebpackPlugin({
      filename:
        process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${loadMinified( path.join(__dirname, './service-worker-prod.js'))}</script>`
    }),
```

并在最后添加 SWPrecacheWebpackPlugin 插件

```js
// service worker caching
new SWPrecacheWebpackPlugin({
  cacheId: 'ysj-admin',
  filename: 'service-worker.js',
  staticFileGlobs: ['dist/**/*.{js,html,css}'],
  minify: true,
  stripPrefix: 'dist/'
})
```

### 在 index.html 中注入 service-worker.js
```
<%= htmlWebpackPlugin.options.serviceWorkerLoader %>
```
如下所示
```

<body>
  <div id="app"></div>
  <%= htmlWebpackPlugin.options.serviceWorkerLoader %>
  <!-- built files will be auto injected -->
</body>   
```

至此，添加完毕，build 之后查看缓存中是否包含 js 检验结果
![图片](https://dn-coding-net-production-pp.qbox.me/a565c7ff-7642-4491-bb5f-4c0da44ae537.png)
