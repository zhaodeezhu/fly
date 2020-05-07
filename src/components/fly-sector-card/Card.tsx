import React, { Component } from 'react';

import {Icon} from 'antd';

export default class Card extends Component<IProps, IState> {

  static defaultProps:IProps = {
    centerLocal: 'leftBottom'
  }

  shouldComponentUpdate(nextProps:IProps) {
    if(JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false
    }
    return true
  }

  render() {
    const {centerLocal} = this.props
    return (
      <div className={`fly-card origin ${centerLocal}`} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

interface IProps {
  style?: any;
  children?: any;
  centerLocal: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
}

interface IState {
 
}
