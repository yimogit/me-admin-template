import router from '@/router'
export default {
  confirm(msg, callback, cancel) {
    confirm(msg) ? callback && callback() : cancel && cancel()
  },
  info(msg) {
    alert(msg)
  },
  warn(msg) {
    alert(msg)
  },
  error(msg) {
    alert(msg)
  },
  redirect(route) {
    console.log(route)
    if (typeof route === 'string' && route && route.indexOf('http')) {
      location.href = route
    } else {
      router.push(route)
    }
  }
}
