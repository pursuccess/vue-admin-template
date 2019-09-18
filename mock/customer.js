import Mock from 'mockjs'

const list = []
const count = 100

const random = () => {
  Math.random()
}

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
    seller: '@first',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    regChannel: '注册渠道',
    num: '@integer(30, 500)',
    position: '职位',
    payType: '支付宝付款',
    teacher: '导师Bog',
    customerService: '客服Bog'
  }))
}

export default [
  {
    url: '/crm/customer/achievement-list',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.body

      const pageList = list.filter((item, index) => index < pagesize * page && index >= pagesize * (page - 1))
      return {
        result: 1,
        data: {
          total: list.length,
          list: pageList,
          totalMoney: '5000.00'
        }
      }
    }
  },

  {
    url: '/crm/customer/customer-records',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.body

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
    url: '/crm/customer/customer-info-save',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/customer/customer-list',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.body

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
    url: '/crm/customer/public-customer-list',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.body

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
    url: '/crm/customer/customer-delay',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/customer/customer-transform',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/customer/customer-follow',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/customer/customer-add-order',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/customer/pick',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/customer/customer-add-tags',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/customer/customer-sellers',
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
  },

  {
    url: '/crm/customer/customer-teacher',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },

  {
    url: '/crm/user/own-group',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.body

      const pageList = list.filter((item, index) => index < pagesize * page && index >= pagesize * (page - 1))

      const groups = []

      for (const i in pageList) {
        groups[i] = {
          id: i,
          name: pageList[i]['name'],
          position: pageList[i]['position'],
          totalMoney: pageList[i]['payTotal'],
          totalNum: pageList[i]['num'],
          monthMoney: pageList[i]['payTotal'],
          monthNum: pageList[i]['num'],
          followNum: pageList[i]['num']
        }
      }

      return {
        result: 1,
        data: {
          total: list.length,
          list: groups
        }
      }
    }
  },

  {
    url: '/crm/user/achievement',
    type: 'post',
    response: config => {
      const data = {
        totalNum: 234,
        totalMoney: '23400.00',
        rank: '2/10',
        pick_quota_remain: '',
        pick_quota_today: ''
      }
      return {
        result: 1,
        data: data
      }
    }
  },

  {
    url: '/crm/finance/finance-list',
    type: 'post',
    response: config => {
      const { page = 1, pagesize = 10 } = config.body

      const pageList = list.filter((item, index) => index < pagesize * page && index >= pagesize * (page - 1))

      const groups = []

      for (const i in pageList) {
        const orderType = random > 0.5 ? 2 : 1
        groups[i] = {
          id: i,
          date: pageList[i]['date'],
          name: pageList[i]['name'],
          sellerCurrent: pageList[i]['sellerCurrent'],
          userOrigin: pageList[i]['userOrigin'],
          orderService: pageList[i]['orderService'],
          payType: pageList[i]['payType'],
          money: pageList[i]['money'],
          orderType: orderType,
          certificate: 'https://cdn.sellermotor.com/homepage/img/fengxianpinggu.jpg'
        }
      }

      return {
        result: 1,
        data: {
          total: list.length,
          list: groups
        }
      }
    }
  },

  {
    url: '/crm/finance/order-confirm',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  }
]
