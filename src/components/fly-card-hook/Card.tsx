import React, {useEffect} from 'react';

export default function Card (props:IProps) {
  
  useEffect(() => {
    console.log(222)
    
  }, [props.style, props.children])
  return (
    <div className="fly-card" style={props.style}>
      {props.children}
    </div>
  )
}

interface IProps {
  style: any;
  children?: any;
}