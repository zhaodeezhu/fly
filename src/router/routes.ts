import React from 'react';

import Index from '../pages/index'
import Login from '../pages/login'
import Introduce from '../pages/introduce'
import Main from '../pages/main'

import moduleRoutes from './moduleRoutes'

const Platform = React.lazy(() => import('../pages/platform'))

// const NewsDetail = React.lazy(() => import('@/pages/newsDetail'))
let a:IRoutes[] = [
  {
    path: '/login',
    Component: Login,
    exact: true,
    meta: {
      title: '登录',
      show: false
    }
  },
  {
    path: '/',
    Component: Index,
    exact: false,
    meta: {
      title: '落叶中心',
      show: false
    },
    routes: [
      {
        path: '/index',
        Component: Main,
        exact: false,
        meta: {
          title: '落叶中心',
          show: true
        },
        routes: [
          ...(moduleRoutes.workCenter.routes && moduleRoutes.workCenter.routes.length > 0 ? moduleRoutes.workCenter.routes : [moduleRoutes.workCenter]),
          ...(moduleRoutes.Test.routes && moduleRoutes.Test.routes.length > 0 ? moduleRoutes.Test.routes : [moduleRoutes.Test])
        ]
      },
      {
        path: '/main',
        Component: Introduce,
        exact: false,
        meta: {
          title: '落叶中心',
          show: true
        }
      }
    ]
  }
]

export interface IRoutes {
  /** 路由 */
  path: string;
  /** 组件 */
  Component: any;
  /** 是否严格匹配 */
  exact: boolean;
  /** 介绍信息 */
  meta: IMeta;
  /** 子路由 */
  routes?: any
}

export interface IMeta {
  /** 标题 */
  title: string;
  /** 是否显示在菜单中 */
  show?: boolean;
}

export default a