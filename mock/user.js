
const tokens = {
  admin: {
    token: 'admin-token'
  },
  finance: {
    token: 'finance'
  },
  leon_li: {
    token: 'sm'
  },
  sale: {
    token: 'sale'
  },
  saleSupervisor: {
    token: 'saleSupervisor'
  },
  saleDirector: {
    token: 'saleDirector'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    position: '超级管理员',
    department: '总经办'
  },
  'finance': {
    roles: ['finance'],
    introduction: 'I am an finance',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'finance',
    position: '财务主管',
    department: '财务部'
  },
  'sm': {
    roles: ['saleSupervisor'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'leon_li',
    position: '销售组长',
    department: 'SellerMotor销售部'
  },
  'sale': {
    roles: ['sale'],
    introduction: 'I am a sale',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'sale',
    position: '销售',
    department: 'SellerMotor销售部'
  },
  'saleSupervisor': {
    roles: ['saleSupervisor'],
    introduction: 'I am a saleSupervisor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'saleSupervisor',
    position: '销售组长',
    department: 'SellerMotor销售部'
  },
  'saleDirector': {
    roles: ['saleDirector'],
    introduction: 'I am a saleDirector',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'saleDirector',
    position: '销售总监',
    department: 'SellerMotor销售部'
  }
}

export default [
  // user login
  {
    url: '/crm/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        // code: 20000,
        result: 1,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/crm/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        // code: 20000,
        result: 1,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/crm/user/logout',
    type: 'post',
    response: _ => {
      return {
        // code: 20000,
        result: 1,
        data: 'success'
      }
    }
  }
]
