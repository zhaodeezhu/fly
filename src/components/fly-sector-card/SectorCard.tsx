import React, { Component } from 'react';

import Card from './Card';

import './index.less';

export default class SectorCard extends Component<IProps, IState> {
  static defaultProps:IProps = {
    angle: 10,
    times: 0.2,
    data: [],
    width: 140,
    height: 200,
    centerLocal: 'leftBottom',
    transitionTime: '0.5s'
  }
  state = {
    check: false
  }
  shouldComponentUpdate(nextProps:IProps, nextState:IState) {
    if(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false
    }
    return true
  }
  render() {
    const {centerLocal, width, height, times, angle, transitionTime} = this.props
    return (
      <div 
        className={`fly-sector ${centerLocal}`}
        style={{
          width: width,
          height: height
        }}
        onMouseEnter={() => {
          this.setState({check: true})
        }}
        onMouseLeave={() => {
          this.setState({check: false})
        }}
      >
        {
          this.props.data.map((item, index) => {
            return (
              <Card
                key={index}
                centerLocal={centerLocal}
                style={{
                  transition: transitionTime,
                  transitionDelay: this.state.check ? (4 - index) * times + 's' : index * times + 's',
                  transform: this.state.check ? `rotate(${index * angle}deg)` : `rotate(${0}deg)`,
                }}
              >
                {item}
              </Card>
            )
          })
        }
      </div>
    );
  }
}

interface IProps {
  /** 旋转间隔的角度 */
  angle: number;
  /** 每一个间隔的时间 单位 s*/
  times: number;
  /** 卡片上显示的内容数据,决定卡片的数量 */
  data: any[];
  /** 卡片的宽度 */
  width: number;
  /** 卡片的高度 */
  height: number;
  /** 选装的中心点 */
  centerLocal: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  /** 动画时间 */
  transitionTime: string;
};

interface IState {
  check: boolean;
};
