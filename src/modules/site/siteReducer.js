import { combineReducers } from 'redux'
import * as siteActions from './siteActions'

import Immutable from 'seamless-immutable'

const currentState = Immutable({
})

const listState = Immutable({
})

export const scratchState = Immutable({
  active:         false,
  credentials: {
    password:     'password',
    username:     'email'
  },
  collections: {
    contact:      null,
    user:         null,
  },
  dbNm:           null,
  domainID:       null,
  name:           null,
  pemFiles: {
    private:      null,
    public:       null
  },
  resetURI:       null,
  roles:          [],
  signingMethod:  'RSA',
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

  case siteActions.SITE_SCRATCH_SET:
    return scratchState.merge(action.params.site, {deep: true})

  case siteActions.SITE_SCRATCH_CREATE:
    return scratchState

  case siteActions.SITE_SCRATCH_PROP: {
    console.log('action in site prop:', action)
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

export const site = combineReducers({
  current,
  list,
  scratch,
})
