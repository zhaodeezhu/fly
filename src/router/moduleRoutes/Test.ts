import React from 'react';
import Demo from '@/pages/Test/Demo';
// const Demo = React.lazy(() => import('@/pages/Test/Demo'));
export default {
  path: '/Test',
  Component: '',
  exact: true,
  meta: {
    title: '工作中心',
    show: true
  },
  routes: [
    {
      path: '/index/test/demo',
      Component: Demo,
      exact: true,
      meta: {
        title: '测试',
        show: true
      }
    }
  ]
}