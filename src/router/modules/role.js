/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const roleRouter = [
  {
    path: '/role',
    name: 'Role',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/role/index'),
        meta: { title: '账户设置', icon: 'set' }
      }
    ]
  }
  // {
  //   path: '/role-edit/:id',
  //   name: 'RoleEdit',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/weixin/template-message'),
  //       meta: { activeMenu: '/role' },
  //       hidden: true
  //     }
  //   ]
  // }
]
export default roleRouter
