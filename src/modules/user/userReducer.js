import { combineReducers } from 'redux'
import * as userActions from './userActions'

import Immutable from 'seamless-immutable'

const currentState = Immutable({


})

const listState = Immutable({


})

export const scratchState = Immutable({
  active: false,
  domainID: null,
  email: null,
  contact: {
    _id: null,
    email: null,
    name: {
      first: null,
      last: null,
    },
  },
  password: null,
  scope: [],
})

export function current (state = currentState, action) {
  switch (action.type) {

  default:
    return state
  }
}

export function list (state = listState, action) {
  switch (action.type) {

  default:
    return state
  }
}

export function scratch (state = scratchState, action) {
  switch (action.type) {

  case userActions.USER_SCRATCH_SET:
    return scratchState.merge(action.params.user, {deep: true})

  case userActions.USER_SCRATCH_CREATE:
    return scratchState

  case userActions.USER_SCRATCH_PROP: {
    let keyS = Object.keys(action.prop)
    let rets = keyS.map(key => {
      return state.setIn(key.split('.'), action.prop[key])
    })
    return state.merge(rets)
  }

  default:
    return state
  }
}

export const user = combineReducers({
  current,
  list,
  scratch,
})
