import React, {Component, Suspense} from 'react'
import routerMap from './routerMap'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import routes from './routes'

export default class RouterWatch extends Component {
  render () {
    return (
      <div>
        <Router>
          <Switch>
            {routerMap(routes)}
          </Switch> 
        </Router>
      </div>
    )
  }
}