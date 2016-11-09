/* eslint-disable no-undef */
import * as actions from '../siteActions'

import { scratchState } from '../siteReducer'

describe('site list actions', () => {

  it('should create action to create new site', () => {
    const fetchRequestAction = {type: actions.SITE_SCRATCH_CREATE}
    expect(actions.setSiteCreate()).toEqual(fetchRequestAction)
  })

  it('should create action to set site to scratch', () => {
    const params = {
      siteID: 'abcf'
    }
    const setSiteAction = {type: actions.SITE_SCRATCH_SET, params}
    expect(actions.setSiteScratch(params)).toEqual(setSiteAction)
  })

  it('should create action to set scratch property', () => {

    const prop = {
      'name.first': 'test'
    }
    const setSitePropAction = {type: actions.SITE_SCRATCH_PROP, prop}
    expect(actions.setSiteProp(prop)).toEqual(setSitePropAction)
  })
})
