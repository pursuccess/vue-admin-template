/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const customerRouter = [
  {
    path: '/achievement',
    name: 'Achievement',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/customer/achievement'),
        meta: { title: '我的业绩', icon: 'chart' }
      }
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Layout,
    meta: { title: '客户管理', icon: 'user' },
    redirect: '/own-customer',
    children: [
      {
        path: '/own-customer',
        name: 'OwnCustomer',
        component: () => import('@/views/customer/own-customer'),
        meta: { title: '我的客户', icon: 'user' }
      },
      {
        path: '/public-customer',
        name: 'PublicCustomer',
        component: () => import('@/views/customer/public-customer'),
        meta: { title: '公有客户池', icon: 'international' }
      },
      {
        path: '/own-group',
        name: 'OwnGroup',
        component: () => import('@/views/customer/own-group'),
        meta: { title: '我的组员', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/finance',
    name: 'Finance',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/customer/finance'),
        meta: { title: '财务审核', icon: 'component' }
      }
    ]
  }
]
export default customerRouter
