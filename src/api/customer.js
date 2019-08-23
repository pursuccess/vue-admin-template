import request from '@/utils/request'

export function getAchievementList(params) { // 我的业绩列表
  return request({
    url: '/customer/achievement-list',
    method: 'get',
    params
  })
}

export function getCustomerRecords(params) {
  return request({
    url: '/customer/customer-records',
    method: 'get',
    params
  })
}

export function customerInfoSave(params) {
  return request({
    url: '/customer/customer-infosave',
    method: 'get',
    params
  })
}

export function getCustomerList(params) { // 我的客户列表
  return request({
    url: '/customer/customer-list',
    method: 'get',
    params
  })
}

export function getPublicCustomerList(params) { // 公共客户池
  return request({
    url: '/customer/public-customer-list',
    method: 'get',
    params
  })
}

export function customerDelay(params) {
  return request({
    url: '/customer/customer-delay',
    method: 'get',
    params
  })
}

export function customerTransform(params) {
  return request({
    url: '/customer/customer-transform',
    method: 'get',
    params
  })
}

export function customerFollow(params) {
  return request({
    url: '/customer/customer-follow',
    method: 'get',
    params
  })
}

export function customerAdd(params) {
  return request({
    url: '/customer/customer-addOrder',
    method: 'get',
    params
  })
}

export function customerGet(params) {
  return request({
    url: '/customer/pick',
    method: 'get',
    params
  })
}

export function customerAddTags(params) {
  return request({
    url: '/customer/customer-addtags',
    method: 'get',
    params
  })
}
