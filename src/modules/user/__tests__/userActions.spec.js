/* eslint-disable no-undef */
import * as actions from '../userActions'

describe('user list actions', () => {

  it('should create action to fetch users', () => {

    const params = {
      siteID: 'abc'
    }
    const fetchRequestAction = {type: actions.USER_LIST.REQUEST, params}
    expect(actions.fetchUsers(params)).toEqual(fetchRequestAction)
  })

  it('should create action to persist user', () => {

    const params = {
      siteID: 'abc'
    }
    const persistUserAction = {type: actions.USER_PERSIST.REQUEST, params}
    expect(actions.persistUser(params)).toEqual(persistUserAction)
  })

  it('should create action to set scratch property', () => {

    const prop = {
      'name.first': 'test'
    }
    const setUserPropAction = {type: actions.USER_SCRATCH_PROP, prop}
    expect(actions.setUserProp(prop)).toEqual(setUserPropAction)
  })
})
