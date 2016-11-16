import React from 'react'
// import { Route, IndexRoute } from 'react-router'
import { Route } from 'react-router'

import App from '../modules/app/components/App'
import Site from '../modules/site/components/Site.cont'
import User from '../modules/user/components/User.cont'

export default (store) => {

  return (
    <Route path='/' component={App}>
      <Route path='site' component={Site} />
      <Route path='user' component={User} />
    </Route>
  )
}