import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@id',
    title: '@sentence(5, 10)',
    tel: '15288888888',
    customer_name: 'name',
    time: '@datetime',
    money: '@integer(300, 5000)'
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
  }
]
