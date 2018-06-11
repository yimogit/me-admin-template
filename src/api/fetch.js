import axios from 'axios'
import _config from '@/_config'
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
    if (response.status === 200) {
      return resp
    }
    return response
  },
  error => {
    if (
      error.message &&
      (error.message.indexOf('403') ||
        error.message.indexOf('401') ||
        error.message.indexOf('500'))
    ) {
      alert('接口异常,请稍后再试')
    }
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default instance
