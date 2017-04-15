import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../modules/app/components/App'
import Dashboard from '../modules/app/components/Dashboard'
import Basic from '../modules/app/components/Basic.cont'

import LoginForm from '../modules/auth/components/LoginForm'
import Site from '../modules/site/components/Site.cont'

import ForgotForm from '../modules/reset/components/ForgotForm'
import PasswordForm from '../modules/reset/components/PasswordForm'

import User from '../modules/user/components/User.cont'

import { userAuthVals } from '../utils'

function requireAuth(nextState, replace) {
  if (!userAuthVals.getToken()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export default (store) => {
  return (
    <Route path='/' >
      <Route path='login' component={Basic}>
        <IndexRoute component={LoginForm} />
      </Route>

      <Route path='reset' component={Basic}>
        <IndexRoute component={ForgotForm} />
        <Route path='password' component={PasswordForm} />
      </Route>

      <Route path='admin' component={App} onEnter={requireAuth}>
        <IndexRoute component={Dashboard} />
        <Route path='site' component={Site} />
        <Route path='user' component={User}>
          <Route path=':siteID' component={User} />
        </Route>
      </Route>
    </Route>
  )
}
