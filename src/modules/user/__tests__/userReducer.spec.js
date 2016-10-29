/* eslint-disable no-undef */
import Immutable from 'seamless-immutable'

import * as reducers from '../userReducer'
import * as actions from '../userActions'

describe('user reducer', () => {

  const scratchState = Immutable({
    active: false,
    email: null,
    name: {
      first: null,
      last: null,
    },
    password: null,
    roles: [],
  })

  // console.log('user:', user)
  it('should return scratch initial state', () => {
    expect(
      reducers.scratch(undefined, {})
    ).toEqual(scratchState)
  })

  it('should return merged scratch user', () => {
    const email = 'test@example.com'
    const res = scratchState.set('email', email)
    expect(
      reducers.scratch(null, {type: actions.USER_SCRATCH_SET, params: {email}})
    ).toEqual(res)
  })

  it('should set scratch property', () => {
    const firstName = 'test'
    const res = scratchState.setIn(['name', 'first'], firstName)
    expect(
      reducers.scratch(scratchState, {type: actions.USER_SCRATCH_PROP, prop: {'name.first': firstName}})
    ).toEqual(res)
  })
})
