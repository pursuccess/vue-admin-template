import request from '@/utils/request'

export function getAchievementList(params) {
  return request({
    url: '/customer/achievementList',
    method: 'get',
    params
  })
}

export function getAchievementRecords(params) {
  return request({
    url: '/customer/achievementRecords',
    method: 'get',
    params
  })
}

export function archievementInfoSave(params) {
  return request({
    url: '/customer/archievementInfoSave',
    method: 'get',
    params
  })
}

export function getCustomerList(params) {
  return request({
    url: '/customer/customerList',
    method: 'get',
    params
  })
}

export function customerDelay(id) {
  return request({
    url: '/customer/customerDelay',
    method: 'get',
    params: { id }
  })
}

export function customerTransform(params) {
  return request({
    url: '/customer/customerTransform',
    method: 'get',
    params
  })
}

export function customerFollow(params) {
  return request({
    url: '/customer/customerFollow',
    method: 'get',
    params
  })
}
