const files = require.context('.', true, /\.js/)
const modules = []
files.keys().forEach(key => {
  if (key === './index.js') {
    return
  }
  // var mk = key.replace(/(^\.\/|\.js$)/g, '')
  var m = files(key)
  var item = Object.keys(m).reduce((s, e) => {
    if (e !== 'default') {
      s[e] = m[e]
    }
    return s
  }, m.default || {})
  modules.push(item)
})
export default modules
