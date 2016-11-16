/* eslint-disable no-undef */
import Immutable from 'seamless-immutable'

import * as reducers from '../userReducer'
import * as actions from '../userActions'
import { scratchState } from '../userReducer'

describe('user reducer', () => {

  const scratchState = reducers.scratchState

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
    const email = 'test@example.com'
    const user = scratchState.set('email', email)
    expect(
      reducers.scratch(scratchState, {type: actions.USER_SCRATCH_SET, params: {user}})
    ).toEqual(user)
  })

  it('should set scratch property', () => {
    const firstName = 'test'
    const res = scratchState.setIn(['contact', 'name', 'first'], firstName)
    expect(
      reducers.scratch(scratchState, {type: actions.USER_SCRATCH_PROP, prop: {'contact.name.first': firstName}})
    ).toEqual(res)
  })
})
