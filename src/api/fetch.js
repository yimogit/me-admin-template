import axios from 'axios'
import _config from '@/_config'
import $ui from '@/_extends/ui'
// import qs from 'qs'

const instance = axios.create({
  baseURL: _config.apiBaseUrl, // api的base_url
  timeout: 10000 // 请求超时时间
  // transformRequest: data => qs.stringify(data)
})
// request拦截器
instance.interceptors.request.use(
  e => {
    e.method = _config.isMockTest ? 'GET' : e.method
    e.url = _config.suffix ? e.url + _config.suffix : e.url
    e.params = e.params || {}
    e.headers = e.headers || {}
    if (localStorage.token) {
      e.headers['Authorization'] = localStorage.token
    }
    return e
  },
  error => ({ status: 0, msg: error.message })
)
// respone拦截器
instance.interceptors.response.use(
  response => {
    const resp = response.data
    if (resp && resp.status === 0 && resp.msg) {
      $ui.pages.warn(resp.msg)
    }
    if (response.status === 200) {
      return resp
    }
    return response
  },
  error => {
    const err = { status: 0, msg: '服务器异常' }
    if (
      error.message &&
      (error.message.indexOf('403') > -1 || error.message.indexOf('401') > -1)
    ) {
      err.msg = '权限校验失败，请重新登录'
    }
    $ui.pages.warn(err.msg)
    console.log('err' + error) // for debug
    return Promise.reject(err)
  }
)

export default instance
