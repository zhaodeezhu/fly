import React, {} from 'react'

function Test(props:IPorps) {
  return (
    <div>
      <button onClick={props.onClick}>{props.name}</button>
    </div>
  )
}

export default React.memo(Test, (prevProps, nextProps) => {
  return true
})

// export default class Test extends Component<IPorps, {}> {
//   render() {
//     console.log(111111)
//     return (
//       <div>
//         <button onClick={this.props.onClick}>{this.props.name}</button>
//       </div>
//     )
//   }
// }

interface IPorps {
  name: string;
  getChild?: any;
  onClick: () => void;
}
