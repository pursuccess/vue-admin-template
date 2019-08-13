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
