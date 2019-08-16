import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@id',
    title: '@sentence(5, 10)',
    tel: '15288888888',
    mail: '5984152@qq.com',
    qq: '@integer(7845895, 14588474152)',
    nickname: '@first',
    name: '@first',
    time: '@datetime',
    money: '@integer(300, 5000)',
    company: '企业名称',
    origin: '客户来源',
    originType: '客户类型',
    tagText: '我是标签',
    tagId: '@integer(0, 8)',
    sellerCurrent: 'Lola',
    distributeTime: '@date',
    sellerPast: 'Bob',
    loginTime: '@date'
  }))
}

export default [
  {
    url: '/customer/achievementList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query

      const pageList = list.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: list.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/customer/achievementRecords',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query

      const pageList = list.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: list.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/customer/archievementInfoSave',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/customerList',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20 } = config.query

      const pageList = list.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: list.length,
          items: pageList
        }
      }
    }
  }
]
