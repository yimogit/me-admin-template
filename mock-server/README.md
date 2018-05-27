## mock-server

此项目提供 mock 服务，使用 express-mockjs 构建，接口以 api 为前缀，所有接口配置到 api 文件下的 js 文件中

## Build

启动 mock 服务器：`node index.js --port 6789`
在项目中使用 nodemon 监听启动：`nodemon --watch mock-server node mock-server/index.js --port 6543`
生成 json:`node build.js --target ./dist-json`

### 注意：

* js 文件按照 express-mockjs 文档编写即可
* 若在 js 中导出方法，则需要对参数进行默认值处理

## 相关文档地址

`express-mockjs`: https://github.com/52cik/express-mockjs/blob/master/README.zh-CN.md
`mockjs-lite`:http://mockjs-lite.js.org/docs/examples.html
