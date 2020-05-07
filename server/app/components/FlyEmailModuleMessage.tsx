import * as React from 'react';
const bodyStyle = {
  border: '1px solid #c0c0c0',
  width: 400,
  boxShadow: '0px 0px 5px 1px #e0e0e0',
  height: 200,
  margin: 'auto'
}
export default function FlyEmailModuleMessage(props:IProps):JSX.Element {
  // 设置默认值
  const {title = '我是标题', name = '赵秀全', content = '我是内容'} = props
  return (
    <div style={{
      border: '1px solid #f0f0f0',
      width: 400,
      boxShadow: '0px 0px 5px 1px #e0e0e0',
      height: 200,
      margin: 'auto',
      borderRadius: 10,
      backgroundColor: '#fff',
      padding: 10
    }}>
      <div style={{
        padding: '4px 0',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex'
      }}>
        <span style={{
          padding: '0px 8px',
          borderRight: '1px solid #f0f0f0',
          display: 'block'
        }}>{name}</span>
        <span style={{
          padding: '0px 8px',
          display: 'block'
        }}>{title}</span>
      </div>
      <div style={{
        
      }}>
        {content}
      </div>
    </div>
  )
}


interface IProps {
  title?:string,
  name?:string,
  content?:string
}
