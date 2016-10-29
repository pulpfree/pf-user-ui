/* eslint-disable no-undef */
import * as actions from '../siteActions'

describe('user list actions', () => {

  it('should create action to fetch users', () => {

    const params = {
      siteID: 'abc'
    }
    const fetchRequestAction = {type: actions.SITE_LIST.REQUEST, params}
    expect(actions.fetchSites(params)).toEqual(fetchRequestAction)
  })

  it('should create action to persist user', () => {

    const params = {
      siteID: 'abc'
    }
    const persistSiteAction = {type: actions.SITE_PERSIST.REQUEST, params}
    expect(actions.persistSite(params)).toEqual(persistSiteAction)
  })

  it('should create action to set scratch property', () => {

    const prop = {
      'name.first': 'test'
    }
    const setSitePropAction = {type: actions.SITE_SCRATCH_PROP, prop}
    expect(actions.setSiteProp(prop)).toEqual(setSitePropAction)
  })
})
