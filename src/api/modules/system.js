import request from '../fetch'

export function getAdminList(params) {
  return request({
    url: '/v1/system/admin/list',
    method: 'get',
    params: params
  })
}
export function getAdminItem(params) {
  return request({
    url: '/v1/system/admin/item',
    method: 'get',
    params: params
  })
}

export function createAdmin(data) {
  return request({
    url: '/v1/system/admin/create',
    method: 'POST',
    data: data
  })
}
export function editAdmin(data) {
  return request({
    url: '/v1/system/admin/edit',
    method: 'POST',
    data: data
  })
}
export function delAdmin(data) {
  return request({
    url: '/v1/system/admin/del',
    method: 'POST',
    data: data
  })
}

export function getRoleList(params) {
  return request({
    url: '/v1/system/role/list',
    method: 'get',
    params: params
  })
}

export function getRoleItem(params) {
  return request({
    url: '/v1/system/role/item',
    method: 'get',
    params: params
  })
}

export function getRoleOptions() {
  return request({
    url: '/v1/system/role/options',
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/v1/system/role/create',
    method: 'POST',
    data: data
  })
}
export function editRole(data) {
  return request({
    url: '/v1/system/role/edit',
    method: 'POST',
    data: data
  })
}

export function delRole(data) {
  return request({
    url: '/v1/system/role/del',
    method: 'POST',
    data: data
  })
}
