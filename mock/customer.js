import Mock from 'mockjs'

const list = []
const count = 100

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    userId: '@id',
    tel: '15288888888',
    mail: '5984152@qq.com',
    qq: '@integer(7845895, 14588474152)',
    nickname: '@first',
    name: '@first',
    date: '@date',
    money: '@integer(300, 5000)',
    company: '企业名称',
    userOrigin: '客户来源',
    userType: '客户类型',
    tags: ['标签1', '标签2', '标签3', 'abc'],
    userLevel: '未注册客户',
    sellerCurrent: 'Lola',
    distributeTime: '@date',
    sellerPast: 'Bob',
    remainIntegral: '@integer(10, 2000)',
    loginTimePast: '@date',
    loginTimes: '@integer(1, 200)',
    registerTime: '@date',
    payTotal: '@integer(398, 5998)',
    orderService: '选品服务',
    detail: '用户记录详情',
    seller: '@first'
  }))
}

export default [
  {
    url: '/customer/achievement-list',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.query

      const pageList = list.filter((item, index) => index < pagesize * page && index >= pagesize * (page - 1))
      return {
        result: 1,
        data: {
          total: list.length,
          list: pageList
        }
      }
    }
  },

  {
    url: '/customer/customer-records',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.query

      const pageList = list.filter((item, index) => index < pagesize * page && index >= pagesize * (page - 1))
      return {
        result: 1,
        data: {
          total: list.length,
          list: pageList
        }
      }
    }
  },

  {
    url: '/customer/customer-info-save',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/customer-list',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.query

      const pageList = list.filter((item, index) => index < pagesize * page && index >= pagesize * (page - 1))
      return {
        result: 1,
        data: {
          total: list.length,
          list: pageList
        }
      }
    }
  },

  {
    url: '/customer/public-customer-list',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.query

      const pageList = list.filter((item, index) => index < pagesize * page && index >= pagesize * (page - 1))
      return {
        result: 1,
        data: {
          total: list.length,
          list: pageList
        }
      }
    }
  },

  {
    url: '/customer/customer-delay',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/customer-transform',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/customer-follow',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/customer-add-order',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/pick',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/customer-add-tags',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/customer/customer-sellers',
    type: 'post',
    response: config => {
      const data = list.filter((item, index) => index < 5)
      const sellers = []
      for (const i in data) {
        sellers[i] = {
          name: data[i]['seller'],
          value: i
        }
      }
      return {
        result: 1,
        data: {
          sellers: sellers
        }
      }
    }
  }
]
