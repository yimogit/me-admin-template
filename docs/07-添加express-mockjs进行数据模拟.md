## express-mockjs

[express-mockjs](https://github.com/52cik/express-mockjs)是楼教主结合 `express+mock-lite` 构建的一个 mock 框架，可以快速的帮助我们在本地搭建一个 mock 服务器

相关资料：

* [express-mockjs](https://github.com/52cik/express-mockjs)
* [mock-lite](http://mockjs-lite.js.org/docs/examples.html)
* [express](http://www.expressjs.com.cn/)

### 安装 express-mockjs 到项目

安装 express-mockjs(v0.4.9):`npm install express-mockjs --save-dev`

### 安装 nodemon 到项目 以监听 mock 代码修改

安装 nodemon(v1.17.4):`npm install nodemon --save-dev`

### 新建 mock-server/index.js 编写启动服务器代码

```js
var path = require('path')
var express = require('express')
var mockjs = require('express-mockjs')

var app = express()

// 自定义路径 前缀： '/api'
var config = {
  port: 3000
}
//以/api为前缀，寻找api目录下的所有接口
app.use('/api', mockjs(path.join(__dirname, 'api')))

// 获取port参数 可通过 --port自 定义启动端口
var args = process.argv
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port' && i < args.length - 1 && args[i + 1] > 0) {
    config.port = args[i + 1]
    break
  }
}

console.log('mock-server[mockjs-lite]:http://localhost:' + config.port)
// console.log('mockjs-lite定义：http://mockjs-lite.js.org/docs/examples.html')
app.listen(config.port)
```

### 编写接口文件

在 mock-server 文件夹创建 api 文件夹，并安装 [expess-mockjs 的文档](https://github.com/52cik/express-mockjs)编写 json/js
json

```json
/**
 * Interface function description
 *
 * @url /api-access-path
 *
 * Parameter description and other instructions.
 * uid: user ID
 * name: username
 * email: the email
 * etc.
 */

{
  "code": 0,
  "result|5": [
    {
      "uid|+1": 1,
      "name": "@name",
      "email": "@email"
    }
  ]
}
```

js

```js
/**
 * home page links
 *
 * @url /home-links
 *
 * Here you can write a detailed description
 * of the parameters of the information.
 */

module.exports = {
  code: function() {
    // simulation error code, 1/10 probability of error code 1.
    return Math.random() < 0.1 ? 1 : 0
  },
  'list|5-10': [{ title: '@title', link: '@url' }]
}
```

### 运行 mock 服务器

在项目的 package.json 中添加 mock 命令并运行：`npm run mock`

```json
"scripts": {
    "dev":
      "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --host 0.0.0.0 --port 5555",
    //...
    "mock": "nodemon --watch mock-server node mock-server/index.js --port 6543"
  },
```

### 代码图示

json 定义  
![图片](https://dn-coding-net-production-pp.qbox.me/ffd4d952-6dca-451b-ac7c-5f3debb3b622.png)

package.json 配置  
![图片](https://dn-coding-net-production-pp.qbox.me/483c3448-6fb1-4809-9145-906ad1165750.png)

访问示例  
![图片](https://dn-coding-net-production-pp.qbox.me/da2b2e00-004f-4208-981f-6d9a4cad4887.png)
