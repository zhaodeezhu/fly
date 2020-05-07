import React, { Component } from 'react';
import { routerMap } from '../../router/index';

/** 类型约束 */
import {IHistory, IMatch} from '../../base.d'

/** 数据服务 */
import {observer,inject} from 'mobx-react';
import common from '../../store/common';

/** 工具函数库 */
import axios from '../../plugins/axios';

/** 组件 */
import {Button, Icon} from 'antd';
import ReactJson from 'react-json-view';

/** 样式资源 */
import flyLogo from '../../assets/images/fly.png';
import './index.less';


@inject('common')
@observer
export default class Index extends Component<IProps, {}> {
  state = {
    data: {}
  }
  componentDidMount() {
    // this.getNoteData()
  }
  getNoteData = async () => {
    let res:any = await axios.get('/fly/note/getData')
    this.setState({
      data: res.data
    })
  }
  /** 收缩 */
  get common() {
    return this.props.common
  }
  render() {
    return (
      <div className="fly-index">
        <div className={`fly-herader ${!this.common.pageToggleCheck ? 'fly-header-index' : 'fly-header-main'}`}>
          <div className={`fly-herader-title ${!this.common.pageToggleCheck ? 'title-main' : 'title-introduce'}`} style={{
            width: `${common.menuState ? '80px' : '256px'}`,
            transition: '0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: `${this.common.menuState ? 'center' : 'flex-start'}`
          }}>
            <div onClick={() => {this.props.history.replace('/main')}} className={`fly-herader-logo ${this.common.menuState ? 'active' : ''}`} >
              <img src={flyLogo} alt="落叶"/>
            </div>
            {
              this.common.menuState ? '' : (
                <div className="fly-header-name">
                  落叶基础服务中心
                </div>
              )
            }
          </div>
          <div className="fly-herader-main">
            <div className={`fly-herader-main-icon ${common.menuState ? 'active' : ''}`} onClick={() => {common.changeStateValue<boolean>('menuState', !this.props.common.menuState)}}>
              {
                !this.common.pageToggleCheck && <Icon type="menu-fold" />
              }
            </div>
          </div>
        </div>
        <div className="fly-body">
          {routerMap(this.props.routes)}
        </div>
      </div>
    )
  }
}

interface IProps {
  routes: any;
  history: IHistory;
  common: any;
  match: IMatch;
}

// interface IHistory {
//   /** 返回 */
//   go: (n:number) => void;
//   /** 返回上一级 */
//   goBack: () => void;
//   /** 跳转路由加入页面栈 */
//   push: (path:string) => void;
//   /** 跳转路由不加入页面栈 */
//   replace: (path:string) => void;
// }