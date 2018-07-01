const files = require.context('.', true, /\.js/)
var modules = []
files.keys().forEach(key => {
  if (
    key === './index.js' ||
    (key === './test.js' && process.env.LOAD_TEST_ROUTER !== true)
  ) {
    return
  }
  // var mk = key.replace(/(^\.\/|\.js$)/g, '')
  var m = files(key)
  var item = Object.keys(m).reduce((s, e) => {
    if (e !== 'default') {
      if (Array.isArray(m[e])) {
        modules = modules.concat(m[e])
        return s
      } else s[e] = m[e]
    }
    return s
  }, m.default || {})
  if (item && item.path) modules.push(item)
})
export default modules
