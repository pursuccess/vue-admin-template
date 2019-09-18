import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/crm/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/crm/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/crm/user/logout',
    method: 'post'
  })
}

export function getAchievement() {
  return request({
    url: '/crm/user/achievement',
    method: 'post'
  })
}

export function getOwnGroups(data) {
  return request({
    url: '/crm/user/own-group',
    method: 'post',
    data
  })
}
