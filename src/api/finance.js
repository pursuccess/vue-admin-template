import request from '@/utils/request'

export function getFinanceList(data) { // 财务列表
  return request({
    url: '/crm/finance/finance-list',
    method: 'post',
    data
  })
}

export function orderConfirm(data) {
  return request({
    url: '/crm/finance/order-confirm',
    method: 'post',
    data
  })
}
