import React, {
  Component
} from 'react'
import {
  withRouter
} from 'react-router-dom'
import renderRoutesMap from './routerMap'

import Store from '../store/index'
import {IMeta} from './routes'
interface IProps {
  Component: any;
  routes: any[] | undefined,
  location: any;
  history: any;
  meta: IMeta
}

interface IState {

}
class RouterGuard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }
  componentWillMount() {
    console.log(this.props)
    if (this.props.meta.title) {
      document.title = this.props.meta.title
    }
    if(this.props.location.pathname === '/') {
      this.props.history.replace('/main')
    }
    if(this.props.location.pathname.search('/index') > -1) {
      // Store.common.changePageToggleCheck(false)
      Store.common.pageToggleCheck = false
    } else {
      Store.common.pageToggleCheck = true
      // Store.common.changePageToggleCheck(true)
    }
  }
  componentDidMount() {
    
  }
  render() {
    let {
      Component,
      routes = []
    } = this.props
    return ( 
      <div>
        {Component && <Component {...this.props}/>}
        {/* {renderRoutesMap(routes)} */ } 
      </div>
    )
    }
  }

  export default RouterGuard