/** 路由处理 */
export interface IHistory {
  /** 返回 */
  go: (n: number) => void;
  /** 返回上一级 */
  goBack: () => void;
  /** 跳转路由加入页面栈 */
  push: (path: string) => void;
  /** 跳转路由不加入页面栈 */
  replace: (path: string) => void;
  /** 监听 */
  listen?: any;
}

/** 路由信息 */
export interface IMatch {
  /** 是否严格匹配 */
  isExact: boolean;
  /** 路径参数 */
  params: any;
  /** 路径 */
  path: string;
  /** url */
  url: string;
}

/** 路由列表 */
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

/** 路由自定义信息 */
export interface IMeta {
  /** 标题 */
  title: string;
  /** 是否显示在菜单中 */
  show?: boolean;
}
