const files = require.context('./modules', true, /\.js/)
const modules = {}
files.keys().forEach(key => {
  if (key === './index.js') {
    return
  }
  var mk = key.replace(/(^\.\/|\.js$)/g, '')
  var m = files(key)
  modules[mk] = Object.keys(m).reduce((s, e) => {
    if (e !== 'default') {
      s[e] = m[e]
    }
    return s
  }, m.default || {})
})
export default modules
