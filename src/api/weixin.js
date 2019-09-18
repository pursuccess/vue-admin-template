import request from '@/utils/request'

export function getTemplateList(data) {
  return request({
    url: '/weixin/template/list',
    method: 'post',
    data
  })
}

export function templateDetail(data) {
  return request({
    url: '/weixin/template/detail',
    method: 'post',
    data
  })
}

export function templateSave(data) {
  return request({
    url: '/weixin/template/create-task',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/weixin/template/users',
    method: 'post',
    data
  })
}

export function addToUsers(data) {
  return request({
    url: '/weixin/template/add-to-users',
    method: 'post',
    data
  })
}

export function getFilterUsers(data) {
  return request({
    url: '/weixin/template/filterUsers',
    method: 'post',
    data
  })
}

export function delUsers(data) {
  return request({
    url: '/weixin/template/del-users',
    method: 'post',
    data
  })
}

export function taskStart(data) {
  return request({
    url: '/weixin/template/task-start',
    method: 'post',
    data
  })
}
