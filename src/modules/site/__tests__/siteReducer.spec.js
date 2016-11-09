/* eslint-disable no-undef */
import Immutable from 'seamless-immutable'

import * as reducers from '../siteReducer'
import * as actions from '../siteActions'

describe('site reducer', () => {

  const scratchState = reducers.scratchState

  it('should return scratch initial state', () => {
    expect(
      reducers.scratch(undefined, {})
    ).toEqual(scratchState)
  })

  it('should return new scratch site', () => {
    expect(
      reducers.scratch(scratchState, {type: actions.SITE_SCRATCH_CREATE})
    ).toEqual(scratchState)
  })

  it('should return merged scratch site', () => {
    const dbNm = 'example-db'
    const res = scratchState.set('dbNm', dbNm)
    expect(
      reducers.scratch(null, {type: actions.SITE_SCRATCH_SET, params: {site: res}})
    ).toEqual(res)
  })

  it('should set scratch property', () => {
    const pemFile = 'test'
    const res = scratchState.setIn(['pemFile', 'private'], pemFile)
    expect(
      reducers.scratch(scratchState, {type: actions.SITE_SCRATCH_PROP, prop: {'pemFile.private': pemFile}})
    ).toEqual(res)
  })
})
