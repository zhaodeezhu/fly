import React, { Component } from 'react';
import { routerMap } from '@/router/index';

/** 类型约束 */
import {IHistory, IMatch, IRoutes} from '@/base.d'

/** 数据服务 */
import {observer,inject} from 'mobx-react';

/** 工具函数库 */
import axios from '@/plugins/axios';

/** 组件 */
import {Button, Icon} from 'antd';

/** 样式资源 */
import './index.less';

@observer
export default class {{Demo}} extends Component<IProps, IState> {
  state = {}
  
  render() {
    return (
      <div className="fly-{{class}}">
        
      </div>
    )
  }
}

interface IState {

}

interface IProps {
  routes: IRoutes;
  history: IHistory;
  common: any;
  match: IMatch;
}