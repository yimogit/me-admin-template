import request from '../fetch'

export function getInfo() {
  return request({
    url: '/v1/common/test',
    method: 'get'
  })
}
