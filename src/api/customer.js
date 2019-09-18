import request from '@/utils/request'

export function getAchievementList(data) { // 我的业绩列表
  return request({
    url: '/crm/customer/achievement-list',
    method: 'post',
    data
  })
}

export function getCustomerRecords(data) {
  return request({
    url: '/crm/customer/customer-records',
    method: 'post',
    data
  })
}

export function customerInfoSave(data) {
  return request({
    url: '/crm/customer/customer-info-save',
    method: 'post',
    data
  })
}

export function getCustomerList(data) { // 我的客户列表
  return request({
    url: '/crm/customer/customer-list',
    method: 'post',
    data
  })
}

export function getPublicCustomerList(data) { // 公共客户池
  return request({
    url: '/crm/customer/public-customer-list',
    method: 'post',
    data
  })
}

export function customerDelay(data) {
  return request({
    url: '/crm/customer/customer-delay',
    method: 'post',
    data
  })
}

export function customerTransform(data) {
  return request({
    url: '/crm/customer/customer-transform',
    method: 'post',
    data
  })
}

export function customerFollow(data) {
  return request({
    url: '/crm/customer/customer-follow',
    method: 'post',
    data
  })
}

export function customerAdd(data) {
  return request({
    url: '/crm/customer/customer-add-order',
    method: 'post',
    data
  })
}

export function customerGet(data) {
  return request({
    url: '/crm/customer/pick',
    method: 'post',
    data
  })
}

export function customerAddTags(data) {
  return request({
    url: '/crm/customer/customer-add-tags',
    method: 'post',
    data
  })
}

export function getCustomerSellers(data) {
  return request({
    url: '/crm/customer/customer-sellers',
    method: 'post',
    data
  })
}

export function customerTeacher(data) {
  return request({
    url: '/crm/customer/customer-teacher',
    method: 'post',
    data
  })
}
