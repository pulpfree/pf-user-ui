// import { combineReducers } from 'redux'
import * as authActions from './authActions'

import Immutable from 'seamless-immutable'
import { userAuthVals } from '../../utils'

export const userState = Immutable({
  domainID: null,
  email: null,
  fullName: null,
  isAuthenticated: false,
  name: {
    first: null,
    last: null,
  },
  scope: null,
  scopeBits: null,
  userID: null
})

export function auth (state = userState, action) {
  switch (action.type) {

  case authActions.AUTH_LOGIN:
    const { params } = action
    const u = {
      domainID:         params.domainID,
      email:            params.email,
      fullName:         `${params.contact.first} ${params.contact.last}`,
      isAuthenticated:  true,
      name:             params.contact,
      scope:            params.scope || null,
      scopeBits:        params.scopeBits || null,
      token:            params.token,
      userID:           params.id,
    }
    return userState.merge(u)

  case authActions.AUTH_SET_USER: // Reseting a user from userState
    action.params.isAuthenticated = true
    return userState.merge(action.params)

  case authActions.AUTH_LOGOUT:
    userAuthVals.clearUser()
    return userState

  case authActions.IS_AUTHENTICATED: {
    return userState.isAuthenticated
  }

  default:
    return state
  }
}