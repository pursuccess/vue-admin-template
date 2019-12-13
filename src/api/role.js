import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/crm/role/routes',
    method: 'post'
  })
}

export function getRoles() {
  return request({
    url: '/crm/role/roles',
    method: 'post'
  })
}

export function addRole(data) {
  return request({
    url: '/crm/role/add',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: `/crm/role/edit`,
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: `/crm/role/delete`,
    method: 'post',
    data
  })
}
