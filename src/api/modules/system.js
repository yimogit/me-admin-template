import request from '../fetch'

export function getAdminList(params) {
  return request({
    url: '/v1/system/admin/list',
    method: 'get',
    params: params
  })
}

export function getRoleList(params) {
  return request({
    url: '/v1/system/role/list',
    method: 'get',
    params: params
  })
}
