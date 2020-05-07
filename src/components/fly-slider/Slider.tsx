import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {routes} from '../../router/moduleRoutes'

import {IRoutes, IHistory} from '@/base.d'

import {observer,inject} from 'mobx-react';
import pageStack from '@/store/pageStack';
// 样式
import './index.less'

import { Menu, Icon } from 'antd'
const { SubMenu } = Menu
@observer
export default class Slider extends Component<IProps, IState> {
  state = {
    iconRotate: 0,
    currentPath: '',
    menuRoutes: []
  }
  componentDidMount() {
    // 设置当前的路径
    this.setState({
      currentPath: window.location.pathname
    })
  }

  /** tab切换 */
  handleMenuChange = (route:IRoutes) => {
    this.props.history.push(route.path);
    // pageStack.addPage(route, this.props.history);
    // pageStack.changeStateValue<IRoutes[]>('pageStack', [...pageStack.pageStack, route])
    // pageStack.changeStateValue<string>('acitveKey', route.path);
  }

  private handleClick = (value:IRoutes) => {
    console.log(value)
    pageStack.addPage(value, this.props.history);
    // this.setState({
    //   currentPath: value.key
    // })
  }

  /** 过滤菜单 */
  private filterMenuRoutes = () => {
    let {menuRoutes} = this.state
    makeRoutesMenu(routes)
    function makeRoutesMenu(routes:IRoutes[]) {
      routes.forEach(item => {
        if(item.routes && item.routes.length > 0) {
          if(item.meta.show) {

          }
        }
      })
    }
  }

  /** 生成菜单 */
  private makeMenu = (routes:IRoutes[]) => {
    return routes.map(item => {
      if(item.routes && item.routes.length > 0) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <Icon type="mail" />
                <span>{item.meta.title}</span>
              </span>
            }
          >
            {this.makeMenu(item.routes)}
          </SubMenu>
        )
      } else {
        if(item.meta.show) {
          return (
            <Menu.Item key={item.path} onClick={() => {this.handleMenuChange(item)}}>
              <span>{item.meta.title}</span>
            </Menu.Item>
          )
        } else {
          return (
            <Menu.Item 
              style={{
                display: 'none'
              }}
              key={item.path}
            >
              <span onClick={() => {this.handleMenuChange(item)}}>{item.meta.title}</span>
            </Menu.Item>
          )
        }
      }
    })
  }
  render() {
    // console.log(this.props)
    return (
      <div className="cb-slider">
        <div className={`cb-slider-bottom ${this.props.menuState ? 'active' : ''}`}>
          <Menu
            defaultOpenKeys={['sub1']}
            selectedKeys={[pageStack.acitveKey]}
            mode="inline"
            inlineCollapsed={this.props.menuState}
          >
            {this.makeMenu(routes)}
          </Menu>
        </div>
      </div>
    )
  }
}

interface IProps {
  menuState?: any;
  changeMenuState?: any;
  pathname?:string;
  history: IHistory;
}

interface IState {
  currentPath: string;
  iconRotate: number;
  menuRoutes: IRoutes[];
}
