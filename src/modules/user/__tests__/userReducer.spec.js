/* eslint-disable no-undef */
import Immutable from 'seamless-immutable'

import * as reducers from '../userReducer'
import * as actions from '../userActions'
import { scratchState } from '../userReducer'

describe('user reducer', () => {

  const user = {
    active: true,
    contact: {
      _id: null,
      name: {
        first: 'Test',
        last: 'Dummy',
      },
    },
    domainID: null,
    email: 'test@me.com',
    password: null,
    scope: []
  }

  it('should return scratch initial state', () => {
    expect(
      reducers.scratch(undefined, {})
    ).toEqual(scratchState)
  })

  it('should return new scratch create', () => {
    expect(
      reducers.scratch(scratchState, {type: actions.USER_SCRATCH_CREATE})
    ).toEqual(scratchState)
  })

  it('should return merged scratch user', () => {
    const retUser = scratchState.merge(user)
    expect(
      reducers.scratch(scratchState, {type: actions.USER_SCRATCH_SET, params: {user}})
    ).toEqual(retUser)
  })

  it('should set scratch property', () => {
    const firstName = 'test'
    const res = scratchState.setIn(['name', 'first'], firstName)
    expect(
      reducers.scratch(scratchState, {type: actions.USER_SCRATCH_PROP, prop: {'name.first': firstName}})
    ).toEqual(res)
  })
})
