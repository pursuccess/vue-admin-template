/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const wxRouter = [
  {
    path: '/template-message',
    name: 'TemplateMessage',
    component: Layout,
    meta: { roles: ['wxAdmin'] },
    children: [
      {
        path: '',
        component: () => import('@/views/wx/template-message'),
        meta: { title: '模板消息', icon: 'chart' }
      }
    ]
  }
]
export default wxRouter
