import request from '../request'

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/account/getinfo',
    method: 'get'
  })
}
