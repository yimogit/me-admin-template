import request from '../fetch'

export function login(data) {
  return request({
    url: '/v2/account/login',
    method: 'post',
    data: data
  })
}

export function getInfo() {
  return request({
    url: '/v1/account/getinfo',
    method: 'get'
  })
}
