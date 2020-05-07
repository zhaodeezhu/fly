import React, {useState} from 'react';

import Card from './Card'

import './index.less'
export default function SectorCard (props:IProps = {angle: 10, times: 0.2, data: []}) {
  /** 控制器 */
  const [check, setCheck]  = useState(false);

  return (
    <div 
        className="fly-sector" 
        onMouseEnter={() => {
          setCheck(true)
        }}
        onMouseLeave={() => {
          setCheck(false)
        }}
      >
        {
          props.data.map((item, index) => {
            return (
              <Card key={index} style={{
                transitionDelay: (4 - index) * props.times + 's',
                transform: check ? `rotate(${index * props.angle}deg)` : `rotate(${0}deg)`  
              }}>
                {item}
              </Card>
            )
          })
        }
      </div>
  );
}

interface IProps {
  /** 旋转间隔的角度 */
  angle: number;
  /** 每一个间隔的时间 单位 s*/
  times: number;
  /** 卡片上显示的内容数据,决定卡片的数量 */
  data: any[];
};
