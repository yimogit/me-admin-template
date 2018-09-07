import request from '../fetch'
import config from '@/_config'

export function getInfo() {
  return request({
    url: '/v1/common/test',
    method: 'get'
  })
}
export function getUploadUrl() {
  return config.apiBaseUrl + '/v1/common/upload' + (config.suffix || '')
}
export function upload(formData, category) {
  if (category) {
    formData.append('category', category)
  }
  return request({
    url: '/v1/common/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: data => data,
    data: formData
  })
}
