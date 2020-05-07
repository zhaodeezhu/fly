import React, { Component, Suspense } from 'react'
import { routerMap } from '@/router/index';

import {observer,inject} from 'mobx-react';

import common from '@/store/common';
import pageStack from '@/store/pageStack';

import {Tabs} from 'antd';
import FlySlider from '@/components/fly-slider';

import {IHistory, IRoutes} from '@/base.d';
import './index.less';

const {TabPane} = Tabs
@observer
export default class Main extends Component<IProps, {}> {
  componentDidMount() {
    
  }
  /** 判断默认打开tab页 */
  private isOpenTabs = () => {
    if(window.location.pathname.split('/').length > 2) {
      // pageStack.addPage(window.location.pathname, this.props.history);
    }
  }
  private get PageStackTabPane() {
    return pageStack.pageStack.map(route => {
      return (
        <TabPane tab={route.meta.title} key={route.path}>
          <route.Component />
        </TabPane>
      )
    })
  }

  /** 已经打开的路由切换 */
  handleTabsChange = (key:string) => {
    // this.props.history.push(key);
    // pageStack.pageSwitch(key, this.props.history);
  }

  /** 关闭路由 */
  handleTabsEdit = (key: string, action:string) => {
    // this.props.history.push(key);
    pageStack.removePage(key, this.props.history);
  }

  render() {
    return (
      <div className="fly-main">
        <div className="fly-main-menu">
          <FlySlider menuState={common.menuState} history={this.props.history} />
        </div>
        <div className="fly-main-body">
              <Suspense fallback={<div>loading...</div>}>
                {routerMap(this.props.routes)}
              </Suspense>
            {/*<Tabs
              activeKey={pageStack.acitveKey}
              onChange={this.handleTabsChange}
              animated={true}
              type="editable-card"
              onEdit={this.handleTabsEdit}
            >
              {this.PageStackTabPane}
            </Tabs>*/}
        </div>
      </div>
    )
  }
}

interface IProps {
  routes: any;
  history: IHistory;
}