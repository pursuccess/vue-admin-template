/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const wxRouter = [
  {
    path: '/template-list',
    name: 'TemplateList',
    component: Layout,
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
    name: 'TemplateMessage',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/weixin/template-message'),
        meta: { activeMenu: '/template-list' },
        hidden: true
      }
    ]
  }
]
export default wxRouter
