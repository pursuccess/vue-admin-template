/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const wxRouter = [
  {
    path: '/template-list',
    name: 'TemplateList',
    component: Layout,
    meta: { roles: ['wxAdmin'] },
    children: [
      {
        path: '',
        component: () => import('@/views/weixin/template-list'),
        meta: { title: '模板消息', icon: 'wechat' }
      }
    ]
  },
  {
    path: '/template-message/:id',
    component: Layout,
    meta: { roles: ['wxAdmin'] },
    children: [
      {
        path: '',
        name: 'TemplateMessage',
        component: () => import('@/views/weixin/template-message'),
        meta: { title: '模板消息', icon: 'wechat', activeMenu: '/template-list' },
        hidden: true
      }
    ]
  }
]
export default wxRouter
