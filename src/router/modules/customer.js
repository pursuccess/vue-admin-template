/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const customerRouter = [
  {
    path: '/achievement',
    name: 'Achievement',
    component: Layout,
    meta: { roles: ['sale', 'saleSupervisor', 'saleDirector'] },
    children: [
      {
        path: '',
        component: () => import('@/views/customer/achievement'),
        meta: { title: '我的业绩', icon: 'chart' }
      }
    ]
  },
  {
    path: '/own-customer',
    name: 'OwnCustomer',
    component: Layout,
    meta: { roles: ['sale', 'saleSupervisor', 'saleDirector'] },
    children: [
      {
        path: '',
        component: () => import('@/views/customer/own-customer'),
        meta: { title: '我的客户', icon: 'user' }
      }
    ]
  },
  {
    path: '/public-customer',
    name: 'PublicCustomer',
    component: Layout,
    meta: { roles: ['sale', 'saleSupervisor', 'saleDirector'] },
    children: [
      {
        path: '',
        component: () => import('@/views/customer/public-customer'),
        meta: { title: '公有客户池', icon: 'international' }
      }
    ]
  },
  {
    path: '/own-group',
    name: 'OwnGroup',
    component: Layout,
    meta: { roles: ['saleSupervisor', 'saleDirector'] },
    children: [
      {
        path: '',
        component: () => import('@/views/customer/own-group'),
        meta: { title: '我的组员', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/finance',
    name: 'Finance',
    component: Layout,
    meta: { roles: ['finance'] },
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
