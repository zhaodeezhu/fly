import * as React from 'react';

import {inject, observer} from 'mobx-react'

import {RouterView} from './router'

import obj from './plugins/util'

import logo from './logo.svg';

// import {getPost} from './api/index'

interface IProps {
  common?: any;
}

interface IState {
  common: any;
}

@inject('common')
@observer
class App extends React.Component<IProps, IState> {
  componentDidMount () {
    // this.getPostInterface()
    console.log(this.props.common.screenWidthCheck)
  }
  private getPostInterface = async () => {
    
  }
  public render() {
    return (
      <div className="App">
        {/* {this.props.common} */}
        <RouterView />
      </div>
    );
  }
}

export default App;
