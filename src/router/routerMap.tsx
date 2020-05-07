import React from 'react'
import RouterGuard from './routerGuard'
import { Route } from 'react-router-dom'

const renderRoutesMap = (routes:any[]) => (
    routes && routes.map((route, index) => {
        let exact = route.exact ? route.exact : false
        return (
            <Route key={index} exact={exact} path={route.path} render={props => (
                <RouterGuard {...route} {...props} />
            )}
            />
        )
    })
)

export default renderRoutesMap