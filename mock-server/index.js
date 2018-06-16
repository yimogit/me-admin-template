var path = require('path')
var express = require('express')
var mockjs = require('express-mockjs')
var app = express()

// 使用默认路径 '/'（不推荐）
// app.use(mockjs(path.join(__dirname, 'mocks')))
// 自定义路径 '/api'
var config = loadConfig(['port'], '--')
app.use('/api/v1', mockjs(path.join(__dirname, 'api/v1')))
app.use('/api/v2', mockjs(path.join(__dirname, 'api/v2')))

console.log('mock-server[mockjs-lite]:http://localhost:' + config.port)
// console.log('mockjs-lite定义：http://mockjs-lite.js.org/docs/examples.html')
app.listen(config.port)

/**
 * 根据参数数组加载参数
 * @param {Array} params 键值
 * @param {String} prefix 前缀
 */
function loadConfig(params, prefix) {
  var config = {}
  if (typeof params !== 'object' || params.length === 0) return config
  prefix = prefix || '--'
  var args = process.argv
  for (let i = 0; i < args.length; i++) {
    var key = args[i].indexOf(prefix) === 0 ? args[i].replace(prefix, '') : ''
    if (key && params.indexOf(key) > -1 && i < args.length - 1) {
      config[key] = args[i + 1]
      break
    }
  }
  return config
}
