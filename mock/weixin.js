import Mock from 'mockjs'

const data = Mock.mock({
  'items|100': [{
    id: '@id',
    userLevel: '高级会员',
    name: '@first',
    registerTime: '@date',
    mail: '5984152@qq.com'
  }]
})

const list = data.items

export default [
  {
    url: '/weixin/template/users',
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
    url: '/weixin/template/filterUsers',
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
    url: '/weixin/template/add-to-users',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  },
  {
    url: '/weixin/template/task-start',
    type: 'post',
    response: config => {
      return {
        result: 1,
        data: 'success'
      }
    }
  }
]
