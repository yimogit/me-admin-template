const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const config = loadConfig(['target'], '--')

genMockData(config.target)

/**
 * 生成mock数据
 */
function genMockData(targetDir) {
  var mockjs = require('mockjs-lite')
  var mockApiDir = path.join(__dirname, '/api/')
  var files = readAllFile(mockApiDir, /\.js$/i)
  files.forEach(mpath => {
    var jsDefault = require(mpath)
    //如果是函数则传递一个默认对象
    var jsItem = typeof jsDefault === 'function' ? jsDefault({}) : jsDefault
    var txt = JSON.stringify(mockjs.mock(jsItem))
    var newPath = targetDir + '/api' + mpath.replace(mockApiDir, '') + 'on'
    createFile(newPath, txt)
  })
}

/*
   * 读取指定文件夹下的全部文件，可通过正则进行过滤，返回文件路径数组
   * @param root 指定文件夹路径
   * [@param] reg 对文件的过滤正则表达式,可选参数，示例： 获取指定目录下所有js文件：/\.js$/
  */
function readAllFile(r, p) {
  return (function fn(root, reg) {
    var resultArr = []
    var fs = require('fs')
    if (fs.existsSync(root)) {
      //文件或文件夹存在
      var stat = fs.lstatSync(root) // 对于不存在的文件或文件夹，此函数会报错
      if (stat.isDirectory()) {
        // 文件夹
        var files = fs.readdirSync(root)
        files.forEach(function(file) {
          var t = fn(root + '/' + file, reg)
          resultArr = resultArr.concat(t)
        })
      } else {
        if (reg !== undefined) {
          if (typeof reg.test === 'function' && reg.test(root)) {
            resultArr.push(root)
          }
        } else {
          resultArr.push(root)
        }
      }
    }
    return resultArr
  })(r, p)
}

/**
 * 创建文件，自动创建目录
 */
function createFile(newPath, txt) {
  var dir = path.dirname(newPath)
  if (!fs.existsSync(dir)) {
    shell.mkdir('-p', dir)
  }
  fs.writeFileSync(newPath, txt)
}

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
