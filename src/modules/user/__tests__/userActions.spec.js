/* eslint-disable no-undef */
import * as actions from '../userActions'

describe('user list actions', () => {

  it('should create action to create new scratch site', () => {
    const newScratchAction = {type: actions.USER_SCRATCH_CREATE}
    expect(actions.setUserCreate()).toEqual(newScratchAction)
  })

  it('should create action to set existing user into scratch', () => {
    const params = {
      domainID: 'abc'
    }
    const setUserScratchAction = {type: actions.USER_SCRATCH_SET, params}
    expect(actions.setUserScratch(params)).toEqual(setUserScratchAction)
  })

  it('should create action to set scratch property', () => {
    const prop = {
      'name.first': 'test'
    }
    const setUserPropAction = {type: actions.USER_SCRATCH_PROP, prop}
    expect(actions.setUserProp(prop)).toEqual(setUserPropAction)
  })
})
