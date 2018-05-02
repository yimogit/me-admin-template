import request from '@/utils/fetch'

export function test() {
  return request({
    url: '/test',
    method: 'post'
  })
}
