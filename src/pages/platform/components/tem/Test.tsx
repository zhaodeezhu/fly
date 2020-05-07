import React, { Component } from 'react';
import ReEditor from 're-editor';
import 're-editor/lib/styles/index.css';

export default class Test extends Component<IProps, IState> {
  
  state = {
    value: null
  }
  constructor(props) {
    super(props);
    // let data:string = !localStorage.getItem('re-editor-value') ? '' : localStorage.getItem('re-editor-value') as string;
    
    // this.state = {
    //   value: JSON.parse(data)
    // }
  }
  componentDidMount() {
    // let data:string = !localStorage.getItem('re-editor-value') ? '' : localStorage.getItem('re-editor-value') as string;
    // console.log(JSON.parse(data))
    // this.setState({
    //   value: JSON.parse(data)
    // }, () => {
    //   this.setState({
    //     isShow: true
    //   })
    // })
  }

  handleOnChange = (value) => {
    // console.log(value.toJS());
    // let html = diff(value);
    // console.log(html)
    // this.setState({
    //   value: value
    // })
    localStorage.setItem('re-editor-value', JSON.stringify(value.toJS()));
  }

  render() {
    return (
      <div>
        <ReEditor 
          value={this.state.value}
          // readOnly={true}
          onChange={this.handleOnChange}
          // onImageUpload={async (file) => {
          //   console.log(file);
          //   return 'http://a4.att.hudong.com/21/09/01200000026352136359091694357.jpg'
          // }}
        />
      </div>
    )
  }
}

interface IProps {

}

interface IState {

}

