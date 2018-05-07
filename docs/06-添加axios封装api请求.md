## 安装 axios

`npm install axios --save`

### 创建实例 (utils/fetch.js)

axios 默认提交格式为：`application/json`  
可使用 qs 模块(需要安装)转换后提交格式为 `application/x-www-form-urlencoded`
通过设置 transformRequest 属性 `data => qs.stringify(data)` 可以正常表单形式提交

```js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'apiBaseUrl', // api的base_url
  timeout: 10000 // 请求超时时间
  // transformRequest: data => qs.stringify(data) //
})
// request拦截器
instance.interceptors.request.use(
  e => {
    e.params = e.params || {}
    e.headers = e.headers || {}
    //set 默认值
    return e
  },
  error => ({ status: 0, msg: error.message })
)
// respone拦截器
instance.interceptors.response.use(
  response => {
    const resp = response.data
    if (response.status === 200) {
      return resp
    }
    return resp
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)
export default instance
```

### 将 api 请求封装到 api 文件夹下

在 api 文件中新建接口模块并使用 axios 实例(utils/fetch.js)  
src/api/api_test.js

```js
import request from '@/utils/fetch'

export function test(data) {
  return request({
    url: '/test',
    method: 'post',
    data: data
  })
}
```

使用的时候，可通过引入 api/模块.js 调用方法，也可以通过安装插件的形式将 api 接口扩展到 vue 实例中，使其可以更方便的在项目中使用

### 以 test 模块为例创建一个$api 扩展

src/api/index.js

```js
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
```

在 main.js 安装 $api 扩展:

```js
import api from './api'
Vue.use(api)
```

在项目中调用：`this.$api.api_test.test().then(resp=>{...}).catch(()=>{...})`
