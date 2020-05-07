import React, { useState, useCallback } from 'react';
import { routerMap } from '@/router/index';

/** 类型约束 */
import {IHistory, IMatch, IRoutes} from '@/base.d'

/** 数据服务 */
import {observer,inject} from 'mobx-react';

/** 工具函数库 */
import axios from '@/plugins/axios';

/** 组件 */
import {Button, Icon, Table} from 'antd';
import Test from '@/components/fly-test'

/** 样式资源 */
import './index.less';

function App() {
  console.log('appppppppppppp')
  const [count, setCount] = useState(0)
  const changeData = () => {
    setCount(count + 1)
  }
  const handleClick = useCallback(changeData, [count])
  const getChild = () => {
    return <div>sssssssss</div>
  }
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      "年龄": 0,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      "年龄": 0,
      address: '西湖区湖底公园1号',
    },
  ];
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: '年龄',
      key: '年龄',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const getHgCount = () => {
    let a = 0;
    for(let i = 0; i < 10000; i++) {
      a += i
    }
    console.log(22222);
    return a
  }
  return (
    <div className="fly-demo">
      {count}
      <Table 
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  )
}
// export default class Demo extends Component<IProps, IState> {
//   state = {
//     count: 1
//   }
//   handleClick = () => {
//     this.setState({
//       count: this.state.count + 1 + this.getHgCount
//     })
//   }
//   get getHgCount() {
//     let a = 0;
//     for(let i = 0; i < 10000; i++) {
//       a += i
//     }
//     console.log(22222);
//     return a
//   }
//   render() {
//     return (
//       <div className="fly-demo">
//       {this.state.count}
//       <Test name="赵秀全" onClick={this.handleClick} />
//       </div>
//     )
//   }
// }

export default React.memo(App, (prevProps, nextProps) => {
  return JSON.parse(JSON.stringify(prevProps)) === JSON.parse(JSON.stringify(nextProps))
})

interface IState {

}

interface IProps {
  routes: IRoutes;
  history: IHistory;
  common: any;
  match: IMatch;
}