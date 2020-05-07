import React from 'react';
import Platform from '@/pages/platform';
// const Platform = React.lazy(() => import('@/pages/platform'));
export default {
  path: '/cneter',
  Component: '',
  exact: true,
  meta: {
    title: '工作中心',
    show: true
  },
  routes: [
    {
      path: '/index/platform',
      Component: Platform,
      exact: true,
      meta: {
        title: '落叶-工作台',
        show: true
      }
    },
    {
      path: '/index/name',
      Component: Platform,
      exact: true,
      meta: {
        title: '落叶-用户',
        show: true
      }
    }
  ]
}