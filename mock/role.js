import Mock from 'mockjs'

const routes = [
  {
    name: 'Achievement',
    title: '我的业绩'
  },
  {
    name: 'Customer',
    title: '客户管理',
    children: [
      {
        name: 'OwnCustomer',
        title: '我的客户'
      },
      {
        name: 'PublicCustomer',
        title: '公有客户池'
      },
      {
        name: 'OwnGroup',
        title: '我的组员'
      }
    ]
  },
  {
    name: 'Finance',
    title: '财务审核'
  },
  {
    name: 'TemplateList',
    title: '模板消息'
  },
  {
    name: 'Role',
    title: '账户设置'
  }
]

const roles = [
  {
    role: 'admin',
    name: '超级管理员',
    description: 'I am a super administrator.',
    routes: routes
  },
  {
    role: 'finance',
    name: '财务',
    description: 'I am an finance',
    routes: [{
      name: 'Finance',
      title: '财务审核'
    }]
  },
  {
    role: 'sale',
    name: '销售',
    description: 'I am a sale',
    routes: [
      {
      name: 'Achievement',
      title: '我的业绩'
      },
      {
        name: 'Customer',
        title: '客户管理',
        children: [
          {
            name: 'OwnCustomer',
            title: '我的客户'
          },
          {
            name: 'PublicCustomer',
            title: '公有客户池'
          }
        ]
      }
    ]
  },
  {
    role: 'saleSupervisor',
    name: '销售组长',
    description: 'I am a saleSupervisor',
    routes: routes.filter(i => i.name == '/Achievement' || i.name == '/Customer')// just a mock
  }
]

export default [
  // mock get all routes form server
  {
    url: '/crm/role/routes',
    type: 'post',
    response: _ => {
      return {
        // code: 20000,
        result: 1,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/crm/role/roles',
    type: 'post',
    response: _ => {
      return {
        // code: 20000,
        result: 1,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/crm/role/add',
    type: 'post',
    response: {
      // code: 20000,
      result: 1,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/crm/role/edit',
    type: 'post',
    response: {
      // code: 20000,
      result: 1,
      data: 'success'
    }
  },

  // delete role
  {
    url: '/crm/role/delete',
    type: 'post',
    response: {
      // code: 20000,
      result: 1,
      data: {},
      detail: '角色无效'
    }
  }
]
