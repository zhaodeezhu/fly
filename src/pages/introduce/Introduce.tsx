import React, { Component } from 'react'
import { Icon } from 'antd';
import './index.less'

export default class Introduce extends Component<IProps, {}> {
  render() {
    return (
      <div className="fly-introduce">
        <div className="fly-introduce-body">
          <div>
            FLY-LEAF SERVICE
          </div>
          <div>
            落叶基础公共服务中心平台架构
          </div>
          <div>
            <div onClick={() => {this.props.history.push('/index/platform')}}>开始</div>
            <div>离开</div>
          </div>
        </div>
        <div className="fly-introduce-down">
          <Icon type="down" />
        </div>
      </div>
    )
  }
}

interface IProps {
  routes?: any;
  history: any;
  common?: any;
}
