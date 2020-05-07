import React, { Component } from 'react';

import SectorCard from '@/components/fly-sector-card/SectorCard';
import SectorHook from '@/components/fly-card-hook'
import Test from '@/components/fly-test'
import FlyEmailModuleMessage from '@/components/fly-email-module-message';
import DragTest from './components/DragTest'

import './index.less'
export default class Platform extends Component<IProps, IState> {
  state = {
    count: 1
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1 + this.getHgCount
    })
  }
  get getHgCount() {
    let a = 0;
    for(let i = 0; i < 10000; i++) {
      a += i
    }
    console.log(22222);
    return a
  }
  render() {
    return (
      <div className="fly-platform">
        <img src="http://127.0.0.1:4009/api/client/imgStream?id=1" alt="" />
        <img src="http://localhost:6066/apis/noticeView/common/preview" alt="" />
        <img src="https://csbtest-api.gz.cvte.cn/cfile/93caaf4e-478e-4026-a87d-e68b0a9d7713/v1/download/e1b5f7b0a3b94b2a90e00cedcea0e12b" alt=""/>
        <div style={{
          height: 200
        }}>
          <FlyEmailModuleMessage />
          {/*<SectorCard
            data={[111, 22, 33, 44, 55]}
            centerLocal="rightBottom"
            angle={5}
            transitionTime="0.5s"
          />*/}
        </div>
        {this.state.count}
        <Test name="赵秀全" onClick={this.handleClick} />
        <DragTest />
      </div>
    );
  }
}

type IState = {

}

type IProps = {

}
