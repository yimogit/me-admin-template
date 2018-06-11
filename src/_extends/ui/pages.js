import router from '@/router'

export const link = route => {
  if (typeof route === 'string' && route && route.indexOf('http')) {
    location.href = route
  } else {
    router.push(route)
  }
}

export const info = (msg, opt) => {
  alert(msg)
}
export const warn = (msg, opt) => {
  alert(msg)
}
